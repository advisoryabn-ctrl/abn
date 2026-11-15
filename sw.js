/* ABN — استقبال الإشعارات */
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('push',e=>{
  let d={};try{d=e.data?e.data.json():{}}catch(x){}
  e.waitUntil(self.registration.showNotification(d.title||'ABN',{body:d.body||'',data:{work:d.work||null},tag:d.work||'abn',dir:'rtl',lang:'ar'}));
});
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  const w=e.notification.data&&e.notification.data.work;
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{
    for(const c of cs){if('focus'in c){c.postMessage({open:w});return c.focus()}}
    return self.clients.openWindow(self.registration.scope+(w?'#w-'+w:''));
  }));
});
