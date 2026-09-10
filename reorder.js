import {guard,json,log} from './_helpers.js';
const allowed={links:'links',events:'events',announcements:'announcements'};
export async function onRequestPost({request,env}){const bad=await guard(request,env);if(bad)return bad;const b=await request.json().catch(()=>({})),table=allowed[b.type];if(!table||!Array.isArray(b.ids))return json({error:'Invalid reorder payload'},400);const ids=b.ids.map(String);for(let i=0;i<ids.length;i++)await env.DB.prepare(`UPDATE ${table} SET position=? WHERE id=?`).bind(i,ids[i]).run();await log(env,'Reordered content',b.type);return json({ok:true})}
