import {requireAdmin,json,sameOrigin,log} from '../_auth.js';
export async function guard(request,env){if(!sameOrigin(request))return json({error:'Bad origin'},403);if(!await requireAdmin(request,env))return json({error:'Unauthorized'},401);return null}
export {json,log};
