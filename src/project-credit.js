const root=document.querySelector('#app');
function addCredit(){const settings=root.querySelector('.settings');if(!settings||settings.querySelector('.project-credit'))return;const card=document.createElement('article');card.className='project-credit';card.innerHTML='<div class="eyebrow">PROJECT CREDIT</div><h3>TRUTHTRACE</h3><p>OSINT Mini Project</p><strong>Made by Aaditya Devadiga</strong><small>Local evidence-led news verification workspace</small>';settings.append(card)}
new MutationObserver(addCredit).observe(root,{childList:true,subtree:true});addCredit();
