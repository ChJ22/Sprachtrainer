let feedbackError='',modeError='',lastCorrect=null,startError=false;
const $=id=>document.getElementById(id), languages=window.LANGUAGES;
let words=[],queue=[],current=null,score=0,answered=0,locked=false,direction='de',lang='pl',mode='words',mistakes=new Map(),reviewOnly=false;
const audioButtons=document.createElement('div');audioButtons.className='row';
const germanButton=document.createElement('button');germanButton.type='button';germanButton.textContent=t('listen',{language:languageName('de')});
const targetButton=document.createElement('button');targetButton.type='button';targetButton.textContent=t('listen',{language:languageName('pl')});
audioButtons.append(germanButton,targetButton);$('question').after(audioButtons);
function speak(text,locale){if(!('speechSynthesis' in window)){ feedbackError='speechError';$('feedback').textContent=t('speechError');return}const utterance=new SpeechSynthesisUtterance(text);utterance.lang=locale;utterance.rate=.85;const voice=speechSynthesis.getVoices().find(v=>v.lang.toLowerCase()===locale.toLowerCase());if(voice)utterance.voice=voice;speechSynthesis.cancel();speechSynthesis.speak(utterance)}
germanButton.onclick=()=>speak(current.de,'de-DE');
targetButton.onclick=()=>speak(current.target,languages.find(l=>l.id===lang).voice||lang);
for(const l of languages){const o=document.createElement('option');o.value=l.id;o.textContent=languageName(l.id);$('language').append(o)}
$('choose-language').onclick=()=>{startError=false;lang=$('language').value;$('language-screen').classList.add('hidden');$('menu').classList.remove('hidden');$('intro').textContent=t('menu',{de:languageName('de'),language:languageName(lang)})};
$('language-back').onclick=()=>{$('menu').classList.add('hidden');$('language-screen').classList.remove('hidden');$('intro').textContent=t('choose');modeError='';$('mode-message').textContent=''};
function openSetup(selectedMode){startError=false;mode=selectedMode;$('category-filter-label').classList.toggle('hidden',mode==='words');$('direction-label').classList.remove('hidden');updateDirectionLabels();$('filter-title').textContent=t(mode==='grammar'?'topic':'situation');$('menu').classList.add('hidden');$('setup').classList.remove('hidden');$('intro').textContent=t(mode==='grammar'?'setupGrammar':mode==='sentences'?'setupSentences':'setupWords')}
function setCategories(items,allLabel){const categories=[...new Set(items.map(item=>item.category))];$('category-filter').replaceChildren();for(const [value,label] of [['all',allLabel],...categories.map(c=>[c,c])]){const o=document.createElement('option');o.value=value;o.textContent=value==='all'?label:categoryName(value);$('category-filter').append(o)}}
$('mode-words').onclick=()=>openSetup('words');
$('mode-sentences').onclick=async()=>{try{if(!window.SENTENCES?.[lang])await load({file:languages.find(l=>l.id===lang).sentences});setCategories(window.SENTENCES[lang],t('allSituations'));openSetup('sentences')}catch(e){modeError='sentenceError';$('mode-message').textContent=t('sentenceError')}};
function grammarData(){return $('direction').value==='target'?window.GERMAN_GRAMMAR[lang]:window.GRAMMAR[lang]}
function updateDirectionLabels(){const name=languageName(lang),de=languageName('de');$('direction').children[0].textContent=de+' → '+name;$('direction').children[1].textContent=name+' → '+de}
$('direction').onchange=()=>{if(mode==='grammar')setCategories(grammarData(),t('allTopics'))};
$('mode-grammar').onclick=async()=>{try{if(!window.GRAMMAR?.[lang])await load({file:languages.find(l=>l.id===lang).grammar});if(!window.GERMAN_GRAMMAR)await load({file:'german-grammar.js?v=20261002-1'});setCategories(grammarData(),t('allTopics'));openSetup('grammar')}catch(e){modeError='grammarError';$('mode-message').textContent=t('grammarError')}};

function goToMenu(){startError=false;if('speechSynthesis' in window)speechSynthesis.cancel();$('game').classList.add('hidden');$('review').classList.add('hidden');$('setup').classList.add('hidden');$('menu').classList.remove('hidden');reviewOnly=false;$('intro').textContent=t('menu',{de:languageName('de'),language:languageName(lang)});modeError='';$('mode-message').textContent=''}
$('setup-back').onclick=goToMenu;
function shuffle(a){return [...a].sort(()=>Math.random()-.5)}
function load(l){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=l.file;s.onload=resolve;s.onerror=reject;document.head.append(s)})}
$('start').onclick=async()=>{startError=false;direction=$('direction').value;try{if(mode==='words'){if(!window.VOCAB?.[lang])await load(languages.find(x=>x.id===lang));words=window.VOCAB[lang]}else{const selected=$('category-filter').value;const data=mode==='sentences'?window.SENTENCES[lang]:grammarData();words=data.filter(item=>selected==='all'||item.category===selected)}if(words.length<4)throw Error('Insufficient exercise data');queue=shuffle(words);score=answered=0;mistakes=new Map();reviewOnly=false;$('review').classList.add('hidden');$('setup').classList.add('hidden');$('game').classList.remove('hidden');show()}catch(e){startError=true;$('intro').textContent=t('startError')}};
$('back').onclick=goToMenu;
function show(){if(mode==='grammar'){showGrammar();return}audioButtons.hidden=false;if('speechSynthesis' in window)speechSynthesis.cancel();if(!queue.length){if(reviewOnly){finishSession();return}queue=shuffle(words)}current=queue.shift();locked=false;$('next').classList.add('hidden');feedbackError='';lastCorrect=null;$('feedback').textContent='';$('category').textContent=categoryName(current.category);$('question').textContent=direction==='de'?current.de:current.target;germanButton.hidden=direction!=='de';targetButton.hidden=direction==='de';targetButton.textContent=t('listen',{language:languageName(lang)});$('stats').textContent=t('stats',{score,answered});const key=direction==='de'?'target':'de';const distractors=shuffle(words.filter(w=>w[key]!==current[key])).slice(0,3);$('answers').replaceChildren();for(const w of shuffle([current,...distractors])){const b=document.createElement('button');b.textContent=w[key];b.onclick=()=>{if(locked)return;feedbackError='';locked=true;answered++;lastCorrect=w===current;if(w===current){score++;resolveMistake(current);b.classList.add('right');$('feedback').textContent=t('correct')}else{recordMistake(current,w[key]);b.classList.add('wrong');$('feedback').textContent=t('solution',{answer:current[key]});queue.splice(Math.min(3,queue.length),0,current);for(const x of $('answers').children)if(x.textContent===current[key])x.classList.add('right')}$('stats').textContent=t('stats',{score,answered});germanButton.hidden=false;targetButton.hidden=false;$('next').classList.remove('hidden')};$('answers').append(b)}}
$('next').onclick=show;

function showGrammar(){
 targetButton.textContent=t('listen',{language:languageName(lang)});
 if('speechSynthesis' in window)speechSynthesis.cancel();
 audioButtons.hidden=true;
 if(!queue.length){if(reviewOnly){finishSession();return}queue=shuffle(words)}
 current=queue.shift();locked=false;
 $('next').classList.add('hidden');feedbackError='';lastCorrect=null;$('feedback').textContent='';
 $('category').textContent=categoryName(current.category);
 $('question').textContent=direction==='target'?current.target+' → '+current.prompt:current.prompt;
 if(direction==='target'){audioButtons.hidden=false;germanButton.hidden=true;targetButton.hidden=false}
 $('stats').textContent=t('stats',{score,answered});
 $('answers').replaceChildren();
 for(const option of shuffle(current.options)){
  const button=document.createElement('button');button.textContent=option;
  button.onclick=()=>{
   if(locked)return;
   feedbackError='';locked=true;answered++;lastCorrect=option===current.answer;
   if(option===current.answer){score++;resolveMistake(current);button.classList.add('right')}
   else{recordMistake(current,option);button.classList.add('wrong');queue.splice(Math.min(3,queue.length),0,current)}
   for(const answerButton of $('answers').children)if(answerButton.textContent===current.answer)answerButton.classList.add('right');
   $('feedback').textContent=(option===current.answer?t('correct'):t('solution',{answer:current.answer})+'.')+' '+current.explanation+' '+t('example')+' '+current.target+' – '+current.de;
   $('stats').textContent=t('stats',{score,answered});
   germanButton.hidden=false;targetButton.hidden=false;audioButtons.hidden=false;
   $('next').classList.remove('hidden');
  };
  $('answers').append(button);
 }
}

function recordMistake(entry,chosen){
 if(!mistakes.has(entry))mistakes.set(entry,{chosen:new Set(),misses:0,recovered:false});
 const record=mistakes.get(entry);record.chosen.add(chosen);record.misses++;record.recovered=false;
}
function resolveMistake(entry){if(mistakes.has(entry))mistakes.get(entry).recovered=true}
function finishSession(){
 if('speechSynthesis' in window)speechSynthesis.cancel();
 $('game').classList.add('hidden');$('review').classList.remove('hidden');
 $('review-stats').textContent=t('reviewStats',{score,answered,mistakes:mistakes.size});
 $('review-list').replaceChildren();
 if(!mistakes.size){const li=document.createElement('li');li.textContent=t('noMistakes');$('review-list').append(li)}
 for(const [entry,record] of mistakes){
  const li=document.createElement('li');
  const question=mode==='grammar'?(direction==='target'?entry.target+' → '+entry.prompt:entry.prompt):direction==='de'?entry.de:entry.target;
  const answer=mode==='grammar'?entry.answer:direction==='de'?entry.target:entry.de;
  li.textContent=`${categoryName(entry.category)}: ${question} → ${answer}`;
  const detail=document.createElement('small');
  detail.textContent=t('yourAnswer')+' '+[...record.chosen].join(', ')+' · '+t('wrongCount',{count:record.misses})+(record.recovered?' · '+t('recovered'):'')+(mode==='grammar'?' · '+entry.explanation:'');
  li.append(document.createElement('br'),detail);$('review-list').append(li);
 }
 $('repeat-mistakes').disabled=mistakes.size===0;
}
$('finish').onclick=finishSession;
$('repeat-mistakes').onclick=()=>{
 if(!mistakes.size)return;
 reviewOnly=true;queue=shuffle([...mistakes.keys()]);
 $('review').classList.add('hidden');$('game').classList.remove('hidden');show();
};
$('new-round').onclick=()=>{
 if('speechSynthesis' in window)speechSynthesis.cancel();
 mistakes=new Map();reviewOnly=false;queue=shuffle(words);score=answered=0;
 $('review').classList.add('hidden');$('game').classList.remove('hidden');show();
};
$('review-back').onclick=goToMenu;

function refreshInterface(){
 document.documentElement.lang=uiLanguage;document.title=t('title');
 for(const el of document.querySelectorAll('[data-i18n]'))el.textContent=t(el.dataset.i18n);
 for(const option of $('language').children)option.textContent=languageName(option.value);
 updateDirectionLabels();
 $('filter-title').textContent=t(mode==='grammar'?'topic':'situation');
 for(const option of $('category-filter').children)option.textContent=option.value==='all'?t(mode==='grammar'?'allTopics':'allSituations'):categoryName(option.value);
 germanButton.textContent=t('listen',{language:languageName('de')});targetButton.textContent=t('listen',{language:languageName(lang)});
 $('intro').textContent=startError?t('startError'):!$('language-screen').classList.contains('hidden')?t('choose'):!$('setup').classList.contains('hidden')?t(mode==='grammar'?'setupGrammar':mode==='sentences'?'setupSentences':'setupWords'):t('menu',{de:languageName('de'),language:languageName(lang)});
 $('mode-message').textContent=modeError?t(modeError):'';
 $('stats').textContent=t('stats',{score,answered});
 if(current){$('category').textContent=categoryName(current.category);
  if(feedbackError)$('feedback').textContent=t(feedbackError);
  else if(locked&&lastCorrect!==null){const answer=mode==='grammar'?current.answer:direction==='de'?current.target:current.de;
   $('feedback').textContent=(lastCorrect?t('correct'):t('solution',{answer}))+(mode==='grammar'?' '+current.explanation+' '+t('example')+' '+current.target+' – '+current.de:'');
  }
 }
 if(!$('review').classList.contains('hidden'))finishSession();
}
$('ui-language').value=uiLanguage;
$('ui-language').onchange=()=>{uiLanguage=$('ui-language').value;try{localStorage.setItem('trainer-ui-language',uiLanguage)}catch(e){}refreshInterface()};
refreshInterface();
