const root=document.querySelector('#app');
function closeDialog(){document.querySelector('#truthtrace-dialog')?.remove()}
export function showDialog({title='Notice',message='',confirmText='OK',cancelText='',onConfirm=()=>{}}={}){
  closeDialog();
  const dialog=document.createElement('div');dialog.id='truthtrace-dialog';dialog.className='dialog-backdrop';dialog.innerHTML='<section class="app-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title"><button class="dialog-close" aria-label="Close dialog">×</button><div class="dialog-kicker">TRUTHTRACE</div><h2 id="dialog-title"></h2><p class="dialog-message"></p><div class="dialog-actions"></div></section>';
  dialog.querySelector('#dialog-title').textContent=title;dialog.querySelector('.dialog-message').textContent=message;
  const actions=dialog.querySelector('.dialog-actions');
  if(cancelText){const cancel=document.createElement('button');cancel.className='ghost';cancel.textContent=cancelText;cancel.onclick=closeDialog;actions.append(cancel)}
  const confirm=document.createElement('button');confirm.className='button';confirm.textContent=confirmText;confirm.onclick=()=>{closeDialog();onConfirm()};actions.append(confirm);
  dialog.querySelector('.dialog-close').onclick=closeDialog;dialog.onclick=e=>{if(e.target===dialog)closeDialog()};document.body.append(dialog);confirm.focus();
}
window.alert=(message)=>showDialog({title:'Action required',message:String(message)});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeDialog()});
document.addEventListener('click',event=>{
  const deleteButton=event.target.closest('[data-delete]');
  if(deleteButton){event.preventDefault();event.stopImmediatePropagation();const id=deleteButton.dataset.delete;showDialog({title:'Delete investigation?',message:'This removes the local case and its stored evidence. This action cannot be undone.',confirmText:'Delete case',cancelText:'Keep case',onConfirm:()=>{const cases=JSON.parse(localStorage.getItem('truthtrace-cases')||'[]').filter(c=>c.id!==id);localStorage.setItem('truthtrace-cases',JSON.stringify(cases));fetch(`/api/investigations/${id}`,{method:'DELETE'}).catch(()=>{});location.reload()}});return}
  const clearButton=event.target.closest('[data-action="clear"]');
  if(clearButton){event.preventDefault();event.stopImmediatePropagation();showDialog({title:'Clear local investigations?',message:'All cases saved in this browser will be removed. The local sample can be loaded again at any time.',confirmText:'Clear cases',cancelText:'Cancel',onConfirm:()=>{localStorage.removeItem('truthtrace-cases');location.reload()}})}
},true);
