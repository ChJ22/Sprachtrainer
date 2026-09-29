const $=id=>document.getElementById(id), languages=window.LANGUAGES;
let words=[],queue=[],current=null,score=0,answered=0,locked=false,direction='de',lang='pl',mode='words',mistakes=new Map(),reviewOnly=false;
const audioButtons=document.createElement('div');audioButtons.className='row';
const germanButton=document.createElement('button');germanButton.type='button';germanButton.textContent='🔊 Deutsch anhören';
const targetButton=document.createElement('button');targetButton.type='button';targetButton.textContent='🔊 Polnisch anhören';
audioButtons.append(germanButton,targetButton);$('question').after(audioButtons);
function speak(text,locale){if(!('speechSynthesis' in window)){ $('feedback').textContent='Sprachausgabe wird von diesem Browser nicht unterstützt.';return}const utterance=new SpeechSynthesisUtterance(text);utterance.lang=locale;utterance.rate=.85;const voice=speechSynthesis.getVoices().find(v=>v.lang.toLowerCase()===locale.toLowerCase());if(voice)utterance.voice=voice;speechSynthesis.cancel();speechSynthesis.speak(utterance)}
germanButton.onclick=()=>speak(current.de,'de-DE');
targetButton.onclick=()=>speak(current.target,languages.find(l=>l.id===lang).voice||lang);
for(const l of languages){const o=document.createElement('option');o.value=l.id;o.textContent=l.name;$('language').append(o)}
$('choose-language').onclick=()=>{lang=$('language').value;$('language-screen').classList.add('hidden');$('menu').classList.remove('hidden');$('intro').textContent='Was möchtest du auf '+languages.find(l=>l.id===lang).name+' üben?'};
$('language-back').onclick=()=>{$('menu').classList.add('hidden');$('language-screen').classList.remove('hidden');$('intro').textContent='Welche Sprache möchtest du lernen?';$('mode-message').textContent=''};
function openSetup(selectedMode){mode=selectedMode;$('category-filter-label').classList.toggle('hidden',mode==='words');$('direction-label').classList.toggle('hidden',mode==='grammar');$('filter-title').textContent=mode==='grammar'?'Thema':'Situation';$('menu').classList.add('hidden');$('setup').classList.remove('hidden');$('intro').textContent=mode==='grammar'?'Welches Grammatikthema möchtest du üben?':mode==='sentences'?'Welche Sätze möchtest du üben?':'In welche Richtung möchtest du üben?'}
function setCategories(items,allLabel){const categories=[...new Set(items.map(item=>item.category))];$('category-filter').replaceChildren();for(const [value,label] of [['all',allLabel],...categories.map(c=>[c,c])]){const o=document.createElement('option');o.value=value;o.textContent=label;$('category-filter').append(o)}}
$('mode-words').onclick=()=>openSetup('words');
$('mode-sentences').onclick=async()=>{try{if(!window.SENTENCES?.[lang])await load({file:languages.find(l=>l.id===lang).sentences});setCategories(window.SENTENCES[lang],'Alle Situationen');openSetup('sentences')}catch(e){$('mode-message').textContent='Die Sätze konnten nicht geladen werden. Bitte prüfe, ob die Satzdatei für diese Sprache hochgeladen wurde.'}};
$('mode-grammar').onclick=async()=>{try{if(!window.GRAMMAR?.[lang])await load({file:languages.find(l=>l.id===lang).grammar});setCategories(window.GRAMMAR[lang],'Alle Themen');openSetup('grammar')}catch(e){$('mode-message').textContent='Die Grammatikübungen konnten nicht geladen werden. Bitte prüfe, ob die Grammatikdatei für diese Sprache hochgeladen wurde.'}};
function goToMenu(){if('speechSynthesis' in window)speechSynthesis.cancel();$('game').classList.add('hidden');$('review').classList.add('hidden');$('setup').classList.add('hidden');$('menu').classList.remove('hidden');reviewOnly=false;$('intro').textContent='Was möchtest du auf '+languages.find(l=>l.id===lang).name+' üben?';$('mode-message').textContent=''}
$('setup-back').onclick=goToMenu;
function shuffle(a){return [...a].sort(()=>Math.random()-.5)}
function load(l){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=l.file;s.onload=resolve;s.onerror=reject;document.head.append(s)})}
$('start').onclick=async()=>{direction=$('direction').value;try{if(mode==='words'){if(!window.VOCAB?.[lang])await load(languages.find(x=>x.id===lang));words=window.VOCAB[lang]}else{const selected=$('category-filter').value;const data=mode==='sentences'?window.SENTENCES[lang]:window.GRAMMAR[lang];words=data.filter(item=>selected==='all'||item.category===selected)}if(words.length<4)throw Error('Mindestens vier Einträge erforderlich');queue=shuffle(words);score=answered=0;mistakes=new Map();reviewOnly=false;$('review').classList.add('hidden');$('setup').classList.add('hidden');$('game').classList.remove('hidden');show()}catch(e){$('intro').textContent='Die Übung konnte nicht gestartet werden: '+e.message}};
$('back').onclick=goToMenu;
function show(){if(mode==='grammar'){showGrammar();return}audioButtons.hidden=false;if('speechSynthesis' in window)speechSynthesis.cancel();if(!queue.length){if(reviewOnly){finishSession();return}queue=shuffle(words)}current=queue.shift();locked=false;$('next').classList.add('hidden');$('feedback').textContent='';$('category').textContent=current.category;$('question').textContent=direction==='de'?current.de:current.target;germanButton.hidden=direction!=='de';targetButton.hidden=direction==='de';targetButton.textContent='🔊 '+languages.find(l=>l.id===lang).name.split(' ')[0]+' anhören';$('stats').textContent=`${score} richtig von ${answered}`;const key=direction==='de'?'target':'de';const distractors=shuffle(words.filter(w=>w[key]!==current[key])).slice(0,3);$('answers').replaceChildren();for(const w of shuffle([current,...distractors])){const b=document.createElement('button');b.textContent=w[key];b.onclick=()=>{if(locked)return;locked=true;answered++;if(w===current){score++;resolveMistake(current);b.classList.add('right');$('feedback').textContent='Richtig!'}else{recordMistake(current,w[key]);b.classList.add('wrong');$('feedback').textContent=`Richtig ist: ${current[key]}`;queue.splice(Math.min(3,queue.length),0,current);for(const x of $('answers').children)if(x.textContent===current[key])x.classList.add('right')}$('stats').textContent=`${score} richtig von ${answered}`;germanButton.hidden=false;targetButton.hidden=false;$('next').classList.remove('hidden')};$('answers').append(b)}}
$('next').onclick=show;

function showGrammar(){
 targetButton.textContent='🔊 '+languages.find(l=>l.id===lang).name.split(' ')[0]+' anhören';
 if('speechSynthesis' in window)speechSynthesis.cancel();
 audioButtons.hidden=true;
 if(!queue.length){if(reviewOnly){finishSession();return}queue=shuffle(words)}
 current=queue.shift();locked=false;
 $('next').classList.add('hidden');$('feedback').textContent='';
 $('category').textContent=current.category;
 $('question').textContent=current.prompt;
 $('stats').textContent=`${score} richtig von ${answered}`;
 $('answers').replaceChildren();
 for(const option of shuffle(current.options)){
  const button=document.createElement('button');button.textContent=option;
  button.onclick=()=>{
   if(locked)return;
   locked=true;answered++;
   if(option===current.answer){score++;resolveMistake(current);button.classList.add('right')}
   else{recordMistake(current,option);button.classList.add('wrong');queue.splice(Math.min(3,queue.length),0,current)}
   for(const answerButton of $('answers').children)if(answerButton.textContent===current.answer)answerButton.classList.add('right');
   $('feedback').textContent=(option===current.answer?'Richtig!':'Richtig ist: '+current.answer+'.')+' '+current.explanation+' Beispielsatz: '+current.target+' – '+current.de;
   $('stats').textContent=`${score} richtig von ${answered}`;
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
 $('review-stats').textContent=`${score} richtig von ${answered} Antworten · ${mistakes.size} verschiedene Aufgaben falsch beantwortet`;
 $('review-list').replaceChildren();
 if(!mistakes.size){const li=document.createElement('li');li.textContent='Keine Fehler in dieser Runde.';$('review-list').append(li)}
 for(const [entry,record] of mistakes){
  const li=document.createElement('li');
  const question=mode==='grammar'?entry.prompt:direction==='de'?entry.de:entry.target;
  const answer=mode==='grammar'?entry.answer:direction==='de'?entry.target:entry.de;
  li.textContent=`${entry.category}: ${question} → ${answer}`;
  const detail=document.createElement('small');
  detail.textContent=`Deine Antwort: ${[...record.chosen].join(', ')} · ${record.misses}× falsch${record.recovered?' · später richtig':''}${mode==='grammar'?' · '+entry.explanation:''}`;
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
