const E=new TextEncoder();
export async function sig(v,s){const k=await crypto.subtle.importKey('raw',E.encode(s),{name:'HMAC',hash:'SHA-256'},false,['sign']);const b=await crypto.subtle.sign('HMAC',k,E.encode(v));return btoa(String.fromCharCode(...new Uint8Array(b))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')}
export async function requireAdmin(req,env){if(!env.SESSION_SECRET)return false;const m=(req.headers.get('Cookie')||'').match(/(?:^|;\s*)admin_session=([^;]+)/);if(!m)return false;const [e,s]=m[1].split('.');return !!(e&&s&&Number(e)>Date.now()/1000&&s===await sig(e,env.SESSION_SECRET))}
export function sameOrigin(req){const origin=req.headers.get('Origin');if(!origin)return true;const url=new URL(req.url);return origin===url.origin}
export function json(data,status=200,extra={}){return Response.json(data,{status,headers:extra})}
export async function log(env,action,detail=''){if(!env.DB)return;await env.DB.prepare('INSERT INTO activity(id,action,detail,created_at) VALUES(?,?,?,?)').bind(crypto.randomUUID(),action,detail,new Date().toISOString()).run()}
