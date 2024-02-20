const V=Object.entries,nt=Object.fromEntries,ot="ENTRIES",T="KEYS",R="VALUES",_="";class D{set;_type;_path;constructor(t,s){const n=t._tree,o=Array.from(n.keys());this.set=t,this._type=s,this._path=o.length>0?[{node:n,keys:o}]:[]}next(){const t=this.dive();return this.backtrack(),t}dive(){if(this._path.length===0)return{done:!0,value:void 0};const{node:t,keys:s}=E(this._path);if(E(s)===_)return{done:!1,value:this.result()};const n=t.get(E(s));return this._path.push({node:n,keys:Array.from(n.keys())}),this.dive()}backtrack(){if(this._path.length===0)return;const t=E(this._path).keys;t.pop(),!(t.length>0)&&(this._path.pop(),this.backtrack())}key(){return this.set._prefix+this._path.map(({keys:t})=>E(t)).filter(t=>t!==_).join("")}value(){return E(this._path).node.get(_)}result(){switch(this._type){case R:return this.value();case T:return this.key();default:return[this.key(),this.value()]}}[Symbol.iterator](){return this}}const E=e=>e[e.length-1],ut=(e,t,s)=>{const n=new Map;if(t===void 0)return n;const o=t.length+1,u=o+s,i=new Uint8Array(u*o).fill(s+1);for(let r=0;r<o;++r)i[r]=r;for(let r=1;r<u;++r)i[r*o]=r;return W(e,t,s,n,i,1,o,""),n},W=(e,t,s,n,o,u,i,r)=>{const d=u*i;t:for(const c of e.keys())if(c===_){const a=o[d-1];a<=s&&n.set(r,[e.get(c),a])}else{let a=u;for(let h=0;h<c.length;++h,++a){const g=c[h],m=i*a,p=m-i;let l=o[m];const f=Math.max(0,a-s-1),A=Math.min(i-1,a+s);for(let F=f;F<A;++F){const v=g!==t[F],z=o[p+F]+ +v,y=o[p+F+1]+1,w=o[m+F]+1,L=o[m+F+1]=Math.min(z,y,w);L<l&&(l=L)}if(l>s)continue t}W(e.get(c),t,s,n,o,a,i,r+c)}};class C{_tree;_prefix;_size=void 0;constructor(t=new Map,s=""){this._tree=t,this._prefix=s}atPrefix(t){if(!t.startsWith(this._prefix))throw new Error("Mismatched prefix");const[s,n]=x(this._tree,t.slice(this._prefix.length));if(s===void 0){const[o,u]=M(n);for(const i of o.keys())if(i!==_&&i.startsWith(u)){const r=new Map;return r.set(i.slice(u.length),o.get(i)),new C(r,t)}}return new C(s,t)}clear(){this._size=void 0,this._tree.clear()}delete(t){return this._size=void 0,it(this._tree,t)}entries(){return new D(this,ot)}forEach(t){for(const[s,n]of this)t(s,n,this)}fuzzyGet(t,s){return ut(this._tree,t,s)}get(t){const s=I(this._tree,t);return s!==void 0?s.get(_):void 0}has(t){const s=I(this._tree,t);return s!==void 0&&s.has(_)}keys(){return new D(this,T)}set(t,s){if(typeof t!="string")throw new Error("key must be a string");return this._size=void 0,O(this._tree,t).set(_,s),this}get size(){if(this._size)return this._size;this._size=0;const t=this.entries();for(;!t.next().done;)this._size+=1;return this._size}update(t,s){if(typeof t!="string")throw new Error("key must be a string");this._size=void 0;const n=O(this._tree,t);return n.set(_,s(n.get(_))),this}fetch(t,s){if(typeof t!="string")throw new Error("key must be a string");this._size=void 0;const n=O(this._tree,t);let o=n.get(_);return o===void 0&&n.set(_,o=s()),o}values(){return new D(this,R)}[Symbol.iterator](){return this.entries()}static from(t){const s=new C;for(const[n,o]of t)s.set(n,o);return s}static fromObject(t){return C.from(Object.entries(t))}}const x=(e,t,s=[])=>{if(t.length===0||e==null)return[e,s];for(const n of e.keys())if(n!==_&&t.startsWith(n))return s.push([e,n]),x(e.get(n),t.slice(n.length),s);return s.push([e,t]),x(void 0,"",s)},I=(e,t)=>{if(t.length===0||e==null)return e;for(const s of e.keys())if(s!==_&&t.startsWith(s))return I(e.get(s),t.slice(s.length))},O=(e,t)=>{const s=t.length;t:for(let n=0;e&&n<s;){for(const u of e.keys())if(u!==_&&t[n]===u[0]){const i=Math.min(s-n,u.length);let r=1;for(;r<i&&t[n+r]===u[r];)++r;const d=e.get(u);if(r===u.length)e=d;else{const c=new Map;c.set(u.slice(r),d),e.set(t.slice(n,n+r),c),e.delete(u),e=c}n+=r;continue t}const o=new Map;return e.set(t.slice(n),o),o}return e},it=(e,t)=>{const[s,n]=x(e,t);if(s!==void 0){if(s.delete(_),s.size===0)q(n);else if(s.size===1){const[o,u]=s.entries().next().value;$(n,o,u)}}},q=e=>{if(e.length===0)return;const[t,s]=M(e);if(t.delete(s),t.size===0)q(e.slice(0,-1));else if(t.size===1){const[n,o]=t.entries().next().value;n!==_&&$(e.slice(0,-1),n,o)}},$=(e,t,s)=>{if(e.length===0)return;const[n,o]=M(e);n.set(o+t,s),n.delete(o)},M=e=>e[e.length-1],rt=(e,t)=>{const s=e._idToShortId.get(t);if(s!=null)return e._storedFields.get(s)},ct=/[\n\r -#%-*,-/:;?@[-\]_{}\u00A0\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u1680\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2000-\u200A\u2010-\u2029\u202F-\u2043\u2045-\u2051\u2053-\u205F\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u3000-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]+/u,S="or",P="and",lt="and_not",ht=(e,t)=>{e.includes(t)||e.push(t)},N=(e,t)=>{for(const s of t)e.includes(s)||e.push(s)},G=({score:e},{score:t})=>t-e,dt=()=>new Map,b=e=>{const t=new Map;for(const s of Object.keys(e))t.set(parseInt(s,10),e[s]);return t},H=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)?e[t]:void 0,at={[S]:(e,t)=>{for(const s of t.keys()){const n=e.get(s);if(n==null)e.set(s,t.get(s));else{const{score:o,terms:u,match:i}=t.get(s);n.score=n.score+o,n.match=Object.assign(n.match,i),N(n.terms,u)}}return e},[P]:(e,t)=>{const s=new Map;for(const n of t.keys()){const o=e.get(n);if(o==null)continue;const{score:u,terms:i,match:r}=t.get(n);N(o.terms,i),s.set(n,{score:o.score+u,terms:o.terms,match:Object.assign(o.match,r)})}return s},[lt]:(e,t)=>{for(const s of t.keys())e.delete(s);return e}},ft=(e,t,s,n,o,u)=>{const{k:i,b:r,d}=u;return Math.log(1+(s-t+.5)/(t+.5))*(d+e*(i+1)/(e+i*(1-r+r*n/o)))},gt=e=>(t,s,n)=>{const o=typeof e.fuzzy=="function"?e.fuzzy(t,s,n):e.fuzzy||!1,u=typeof e.prefix=="function"?e.prefix(t,s,n):e.prefix===!0;return{term:t,fuzzy:o,prefix:u}},J=(e,t,s,n)=>{for(const o of Object.keys(e._fieldIds))if(e._fieldIds[o]===s){e._options.logger("warn",`SlimSearch: document with ID ${e._documentIds.get(t)} has changed before removal: term "${n}" was not present in field "${o}". Removing a document after it has changed can corrupt the index!`,"version_conflict");return}},mt=(e,t,s,n)=>{if(!e._index.has(n)){J(e,s,t,n);return}const o=e._index.fetch(n,dt),u=o.get(t);u==null||u.get(s)==null?J(e,s,t,n):u.get(s)<=1?u.size<=1?o.delete(t):u.delete(s):u.set(s,u.get(s)-1),e._index.get(n).size===0&&e._index.delete(n)},pt={k:1.2,b:.7,d:.5},Ft={idField:"id",extractField:(e,t)=>e[t],tokenize:e=>e.split(ct),processTerm:e=>e.toLowerCase(),fields:void 0,searchOptions:void 0,storeFields:[],logger:(e,t)=>{typeof console?.[e]=="function"&&console[e](t)},autoVacuum:!0},U={combineWith:S,prefix:!1,fuzzy:!1,maxFuzzy:6,boost:{},weights:{fuzzy:.45,prefix:.375},bm25:pt},_t={combineWith:P,prefix:(e,t,s)=>t===s.length-1},At={batchSize:1e3,batchWait:10},Y={minDirtFactor:.1,minDirtCount:20},yt={...At,...Y},X=(e,t=S)=>{if(e.length===0)return new Map;const s=t.toLowerCase();return e.reduce(at[s])||new Map},B=(e,t,s,n,o,u,i,r,d=new Map)=>{if(o==null)return d;for(const c of Object.keys(u)){const a=u[c],h=e._fieldIds[c],g=o.get(h);if(g==null)continue;let m=g.size;const p=e._avgFieldLength[h];for(const l of g.keys()){if(!e._documentIds.has(l)){mt(e,h,l,s),m-=1;continue}const f=i?i(e._documentIds.get(l),s,e._storedFields.get(l)):1;if(!f)continue;const A=g.get(l),F=e._fieldLength.get(l)[h],v=ft(A,m,e._documentCount,F,p,r),z=n*a*f*v,y=d.get(l);if(y){y.score+=z,ht(y.terms,t);const w=H(y.match,s);w?w.push(c):y.match[s]=[c]}else d.set(l,{score:z,terms:[t],match:{[s]:[c]}})}}return d},Ct=(e,t,s)=>{const n={...e._options.searchOptions,...s},o=(n.fields||e._options.fields).reduce((l,f)=>({...l,[f]:H(n.boost,f)||1}),{}),{boostDocument:u,weights:i,maxFuzzy:r,bm25:d}=n,{fuzzy:c,prefix:a}={...U.weights,...i},h=e._index.get(t.term),g=B(e,t.term,t.term,1,h,o,u,d);let m,p;if(t.prefix&&(m=e._index.atPrefix(t.term)),t.fuzzy){const l=t.fuzzy===!0?.2:t.fuzzy,f=l<1?Math.min(r,Math.round(t.term.length*l)):l;f&&(p=e._index.fuzzyGet(t.term,f))}if(m)for(const[l,f]of m){const A=l.length-t.term.length;if(!A)continue;p?.delete(l);const F=a*l.length/(l.length+.3*A);B(e,t.term,l,F,f,o,u,d,g)}if(p)for(const l of p.keys()){const[f,A]=p.get(l);if(!A)continue;const F=c*l.length/(l.length+A);B(e,t.term,l,F,f,o,u,d,g)}return g},K=(e,t,s={})=>{if(typeof t!="string"){const a={...s,...t,queries:void 0},h=t.queries.map(g=>K(e,g,a));return X(h,a.combineWith)}const{tokenize:n,processTerm:o,searchOptions:u}=e._options,i={tokenize:n,processTerm:o,...u,...s},{tokenize:r,processTerm:d}=i,c=r(t).flatMap(a=>d(a)).filter(a=>!!a).map(gt(i)).map(a=>Ct(e,a,i));return X(c,i.combineWith)},Q=(e,t,s={})=>{const n=K(e,t,s),o=[];for(const[u,{score:i,terms:r,match:d}]of n){const c=r.length,a={id:e._documentIds.get(u),score:i*c,terms:Object.keys(d),match:d};Object.assign(a,e._storedFields.get(u)),(s.filter==null||s.filter(a))&&o.push(a)}return o.sort(G),o},Et=(e,t,s={})=>{s={...e._options.autoSuggestOptions,...s};const n=new Map;for(const{score:u,terms:i}of Q(e,t,s)){const r=i.join(" "),d=n.get(r);d!=null?(d.score+=u,d.count+=1):n.set(r,{score:u,terms:i,count:1})}const o=[];for(const[u,{score:i,terms:r,count:d}]of n)o.push({suggestion:u,terms:r,score:i/d});return o.sort(G),o};class zt{_options;_index;_documentCount;_documentIds;_idToShortId;_fieldIds;_fieldLength;_avgFieldLength;_nextId;_storedFields;_dirtCount;_currentVacuum;_enqueuedVacuum;_enqueuedVacuumConditions;constructor(t){if(t?.fields==null)throw new Error('SlimSearch: option "fields" must be provided');const s=t.autoVacuum==null||t.autoVacuum===!0?yt:t.autoVacuum;this._options={...Ft,...t,autoVacuum:s,searchOptions:{...U,...t.searchOptions||{}},autoSuggestOptions:{..._t,...t.autoSuggestOptions||{}}},this._index=new C,this._documentCount=0,this._documentIds=new Map,this._idToShortId=new Map,this._fieldIds={},this._fieldLength=new Map,this._avgFieldLength=[],this._nextId=0,this._storedFields=new Map,this._dirtCount=0,this._currentVacuum=null,this._enqueuedVacuum=null,this._enqueuedVacuumConditions=Y,this.addFields(this._options.fields)}get isVacuuming(){return this._currentVacuum!=null}get dirtCount(){return this._dirtCount}get dirtFactor(){return this._dirtCount/(1+this._documentCount+this._dirtCount)}get documentCount(){return this._documentCount}get termCount(){return this._index.size}toJSON(){const t=[];for(const[s,n]of this._index){const o={};for(const[u,i]of n)o[u]=Object.fromEntries(i);t.push([s,o])}return{documentCount:this._documentCount,nextId:this._nextId,documentIds:Object.fromEntries(this._documentIds),fieldIds:this._fieldIds,fieldLength:Object.fromEntries(this._fieldLength),averageFieldLength:this._avgFieldLength,storedFields:Object.fromEntries(this._storedFields),dirtCount:this._dirtCount,index:t,serializationVersion:2}}addFields(t){for(let s=0;s<t.length;s++)this._fieldIds[t[s]]=s}}const wt=({index:e,documentCount:t,nextId:s,documentIds:n,fieldIds:o,fieldLength:u,averageFieldLength:i,storedFields:r,dirtCount:d,serializationVersion:c},a)=>{if(c!==1&&c!==2)throw new Error("SlimSearch: cannot deserialize an index created with an incompatible version");const h=new zt(a);h._documentCount=t,h._nextId=s,h._documentIds=b(n),h._idToShortId=new Map,h._fieldIds=o,h._fieldLength=b(u),h._avgFieldLength=i,h._storedFields=b(r),h._dirtCount=d||0,h._index=new C;for(const[g,m]of h._documentIds)h._idToShortId.set(m,g);for(const[g,m]of e){const p=new Map;for(const l of Object.keys(m)){let f=m[l];c===1&&(f=f.ds),p.set(parseInt(l,10),b(f))}h._index.set(g,p)}return h},j=(e,t)=>{const s=e.toLowerCase(),n=t.toLowerCase(),o=[];let u=0,i=0;const r=(c,a=!1)=>{let h="";i===0?h=c.length>20?`… ${c.slice(-20)}`:c:a?h=c.length+i>100?`${c.slice(0,100-i)}… `:c:h=c.length>20?`${c.slice(0,20)} … ${c.slice(-20)}`:c,h&&o.push(h),i+=h.length,a||(o.push(["mark",t]),i+=t.length,i>=100&&o.push(" …"))};let d=s.indexOf(n,u);if(d===-1)return null;for(;d>=0;){const c=d+n.length;if(r(e.slice(u,d)),u=c,i>100)break;d=s.indexOf(n,u)}return i<100&&r(e.slice(u),!0),o},Z=/[\u4e00-\u9fa5]/g,tt=(e={})=>({fuzzy:.2,prefix:!0,processTerm:t=>{const s=t.match(Z)||[],n=t.replace(Z,"").toLowerCase();return n?[n,...s]:[...s]},...e}),xt=(e,t)=>t.contents.reduce((s,[,n])=>s+n,0)-e.contents.reduce((s,[,n])=>s+n,0),bt=(e,t)=>Math.max(...t.contents.map(([,s])=>s))-Math.max(...e.contents.map(([,s])=>s)),et=(e,t,s={})=>{const n={};return Q(t,e,tt({boost:{h:2,t:1,c:4},...s})).forEach(o=>{const{id:u,terms:i,score:r}=o,d=u.includes("@"),c=u.includes("#"),[a,h]=u.split(/[#@]/),g=Number(a),m=i.sort((l,f)=>l.length-f.length).filter((l,f)=>i.slice(f+1).every(A=>!A.includes(l))),{contents:p}=n[g]??={title:"",contents:[]};if(d)p.push([{type:"customField",id:g,index:h,display:m.map(l=>o.c.map(f=>j(f,l))).flat().filter(l=>l!==null)},r]);else{const l=m.map(f=>j(o.h,f)).filter(f=>f!==null);if(l.length&&p.push([{type:c?"heading":"title",id:g,...c&&{anchor:h},display:l},r]),"t"in o)for(const f of o.t){const A=m.map(F=>j(f,F)).filter(F=>F!==null);A.length&&p.push([{type:"text",id:g,...c&&{anchor:h},display:A},r])}}}),V(n).sort(([,o],[,u])=>"max"==="total"?xt(o,u):bt(o,u)).map(([o,{title:u,contents:i}])=>{if(!u){const r=rt(t,o);r&&(u=r.h)}return{title:u,contents:i.map(([r])=>r)}})},st=(e,t,s={})=>Et(t,e,tt(s)).map(({suggestion:n})=>n),k=nt(V(JSON.parse("{\"/\":{\"documentCount\":21,\"nextId\":21,\"documentIds\":{\"0\":\"1\",\"1\":\"1#使用须知\",\"2\":\"1#服务的变更或中止\",\"3\":\"1#免责声明\",\"4\":\"1#知识产权\",\"5\":\"1#条款变更\",\"6\":\"1#其他规定\",\"7\":\"2\",\"8\":\"3\",\"9\":\"4\",\"10\":\"4#msl自带\",\"11\":\"4#使用openfrp\",\"12\":\"5\",\"13\":\"5#mslteam是一个年轻的团队-下面是主要成员\",\"14\":\"6\",\"15\":\"6#房主部分\",\"16\":\"6#成员部分\",\"17\":\"7\",\"18\":\"8\",\"19\":\"8#视频教程\",\"20\":\"9\"},\"fieldIds\":{\"h\":0,\"t\":1,\"c\":2},\"fieldLength\":{\"0\":[1,26],\"1\":[1,70],\"2\":[1,27],\"3\":[1,29],\"4\":[1,35],\"5\":[1,11],\"6\":[1,13],\"7\":[1,1],\"8\":[1,19],\"9\":[1],\"10\":[1,10],\"11\":[1,23],\"12\":[1],\"13\":[3],\"14\":[1,8],\"15\":[1,14],\"16\":[1,24],\"17\":[1,10],\"18\":[1],\"19\":[1],\"20\":[1,3]},\"averageFieldLength\":[1.0952380952380953,20.9864785420341],\"storedFields\":{\"0\":{\"h\":\"MSL用户使用协议\",\"t\":[\"欢迎使用MSLTeam（以下简称“开发者”）提供的 Minecraft Server Launcher（以下简称“本软件”）软件与服务。 为了保障用户（或称“您”）的权益，特制定本用户使用协议书（以下简称本协议）。 请您在使用本软件前，详细阅读本协议的所有内容。开发者可能随时更新本协议，本协议一旦发生变动，开发者将会在相关页面上通告修改内容。 修改后的本协议一旦在页面上公布即有效代替原用户协议书。\",\"请用户仔细阅读以下全部内容，当用户开始使用本软件时，则应视为用户已经详细阅读并同意本协议的全部内容，且同意遵守本协议的规定。\"]},\"1\":{\"h\":\"使用须知\",\"t\":[\"用户应自行配备本软件和本软件所实现功能所需要的硬件和软件配置。\",\"用户应自行负担连接互联网后所需支付的相关电话、宽带使用等费用。\",\"用户应为其使用本软件产生的行为、事件、结果承担法律责任。\",\"用户与其他未授权的非官方个人之间产生的任何交易与纠纷，与开发者无关。\",\"用户应遵守中华人民共和国相关法律法规（如果用户是中华人民共和国境外的使用者，还应遵守所属国家或地区的法律法规）。\",\"用户使用本软件所开启服务器的相关信息由用户自行设置，但本软件内不允许出现包括但不限于涉及种族/宗教、国家政治、国家领导人、淫秽/粗俗内容、诽谤/恐吓、宗教或宗教人物、工作人员、攻击性的、侮辱性的、可能引起误会地、违禁药品等内容。\",\"用户应当自行承担其所发布的信息内容所涉及的法律责任。此外，用户不得发布下列任何内容.如您发布下述任何内容，则开发者有权视情节严重程度，依据本协议及法律法规，对您做出包括但不限于终止服务等处理措施；情节严重的开发者将移交有关行政管理机关给予行政处罚，或者追究您的刑事责任：\",\"反对中华人民共和国宪法所确定的基本原则的；\",\"危害国家安全，泄露国家机密，颠覆国家政权，破坏国家统一的；\",\"损害国家荣誉和利益的；\",\"煽动民族仇恨、民族歧视，破坏民族团结的；\",\"破坏国家宗教政策，宣扬邪教和封建迷信的；\",\"散布谣言，扰乱社会秩序，破坏社会稳定的；\",\"散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；\",\"侮辱或者诽谤他人，侵害他人合法权益的；\",\"含有中华人民共和国法律、行政法规禁止的其他内容的。\",\"除非法律允许或开发者书面许可，用户不得从事下列任何行为：\",\"不合法、不恰当地使用本软件及服务；\",\"破坏本软件系统或网站的正常运行，故意传播计算机病毒等破坏性程序；\",\"采取任何可能影响本软件网络服务的非正常使用行为（包括但不限于损害、攻击服务器或使服务器过度负荷等）；\",\"删除本软件及其副本上关于著作权的信息。\"]},\"2\":{\"h\":\"服务的变更或中止\",\"t\":[\"对用户服务的中止与终止：\",\"用户有发布违法信息、严重违背社会公德、以及其他违反法律禁止性规定的行为，开发者应终止对用户提供服务。\",\"用户在接受本软件服务时实施不正当行为的，开发者有权终止对用户提供服务（该不正当行为的具体情形在本协议中有明确约定）。\",\"用户使用本软件的第三方修改版本的，用户应自行承担风险与法律责任。\",\"对本软件及服务的中断、中止与终止：\",\"发生下列情形之一时，开发者有权终止或中断本软件全部或部分服务，对因此造成的不便与损害，开发者对用户或第三人均不承担任何责任：\",\"因本软件及服务自身的需要；\",\"因服务器遭受损害、无法正常工作；\",\"因突发性的软硬件设备与电子通信设备故障；\",\"因网络提供商线路或其他故障；\",\"因政策因素；\",\"第三方原因或其他不可抗力的情形；\",\"开发者保留在其认为有必要的情况下终止或部分终止本软件及服务的权利，开发者可以采取公告的形式通知用户，但开发者不承担对用户造成的任何损失。\"]},\"3\":{\"h\":\"免责声明\",\"t\":[\"用户理解并同意，在法律许可范围内，开发者不对本软件提供任何保证。 用户使用本软件所造成的的风险均由用户自行承担。\",\"用户理解并同意，开发者不保证本软件及服务一定能满足用户需求，也不保证服务不会被中断，并且对本软件及服务的正确性、安全性等方面不提供任何担保。\",\"用户理解并同意，本软件内存在的第三方服务，包括但不限于内网映射、文件下载等服务，均由第三方提供，开发者不对这些第三方服务的正确性、安全性、合法性等负责。 这些第三方服务与开发者和本软件无关，不代表开发者及本软件的立场。相关争议应由第三方服务提供方承担。\",\"用户理解并同意，本软件不对第三方服务内容提供担保。 若用户使用第三方服务导致财产损毁、版权或知识产权被侵犯等问题，开发者概不负责，不会也不能承担任何法律责任。\",\"用户理解并同意，开发者对本软件实现的功能不提供任何保证和法律支持，包括但不限于使用本软件开启的Minecraft服务器、通过本软件桥接进行联机等，若用户使用本软件实现的功能进行违法犯罪或其他不正当的行为，所造成的风险和法律后果均由用户自行承担。\"]},\"4\":{\"h\":\"知识产权\",\"t\":[\"本软件著作权、专利权及其他知识产权，均为开发者或者指定版权方所有。\",\"本软件所使用的第三方服务归相关版权方所有，包括但不限于：\",\"本软件为游戏Minecraft的服务器辅助工具，其最终解释权归Microsoft公司和MojangAB工作室所有。 用户应当遵守 Minecraft 最终用户许可协议和网易在中国大陆实行的相关政策，不得将游戏本体内容用于商业用途，或实施其他被 Minecraft 最终用户许可协议所禁止的行为。\",\"本软件提供的游戏资源（模组、插件等内容）下载服务由 CurseForge、Spigot 等第三方平台提供，版权依照第三方平台规定处理。\",\"本软件使用的其他第三方服务，版权归服务提供商所有。\",\"本软件是开源软件，用户应当遵守本软件的开源协议。\",\"开发者拥有用户在使用本软件过程中所产生的的任何数据信息（包括但不限于账号资料、应用程序数据及系统衍生数据等）的所有权。 用户仅有权依据本协议、相关法律法规及其他软件使用规则使用上述数据。\",\"用户理解并同意，本软件提供的所有服务器上的数据均归开发者所有。开发者有权决定保留或不保留服务器上的全部或部分数据。\"]},\"5\":{\"h\":\"条款变更\",\"t\":[\"开发者有权在必要的时候修改本协议。本协议一旦发生变动，开发者将在重要页面展示修改内容，敬请定期查询。若用户不同意本协议的修订或更新，用户可以主动停止使用本软件及服务。 若用户在本协议修订后仍继续使用本软件及服务，即表示用户同意本协议所做的所有修订或更新。 若用户在本协议修订后因未熟悉变更而引起的损失，开发者不承担任何责任。\"]},\"6\":{\"h\":\"其他规定\",\"t\":[\"本协议适用于中华人民共和国法律，并且排除一切冲突法规规定地适用；\",\"开发者不行使、未能及时行使或者充分行使本协议或者依照法律规定所享有的权利，不应被视为放弃行使该权利，也不得影响开发者在将来行使该等权利；\",\"在法律许可范围内，开发者享有对本协议条款的解释权；\",\"用户可以通过电子邮件投诉、举报各类违法违规行为，邮件请发送至邮箱2035582067@qq.com\"]},\"7\":{\"h\":\"MSL帮助文档\",\"t\":[\"请在左边选择你想查看的帮助内容噢~\"]},\"8\":{\"h\":\"服务器相关配置\",\"t\":[\"img\",\"服务器名称是显示的名称,实际上与开服无关,建议选择一个自己能区分的即可\",\"服务器存放目录和服务端核心文件建议一旦配置完成就不要随意改动,否则很容易导致服务器无法开启\",\"如果服务器开启失败且能确定和所安装的服务端/Mods/插件无关,则可以尝试调整java相关选项\",\"如果提示分页文件过小则可以手动调整服务器运行内存但是我们还是建议你加钱上更多内存条\",\"服务器JVM参数一般不需要改动,除非JVM是你亲生的你对怎么改很有自信\",\"img\",\"此处为服务器本体相关设置,修改客户端服务器选择界面上显示的服务器介绍可以点击修改更多配置,然后在右侧把motd一项改为想要的值即可\",\"改完记得点保存!\",\"img\",\"如果出现乱码可以尝试调整输入输出编码\",\"下方的快捷指令栏依照自己的需求调整即可\"]},\"9\":{\"h\":\"内网穿透配置\"},\"10\":{\"h\":\"MSL自带\",\"t\":[\"点击图中的配置摁钮:\",\"img\",\"打开新窗口,在上方选择MSL-FRP:\",\"img\",\"在左侧选择节点,在右侧填写好信息即可,点击确定会保存配置并返回主窗口.\",\"回到主窗口,点击启动内网映射摁钮即可启动:\",\"img\"]},\"11\":{\"h\":\"使用OpenFrp\",\"t\":[\"点击图中的配置摁钮:\",\"img\",\"打开新窗口,在上方选择OpenFrp,并根据提示注册/登录:\",\"img\",\"登陆完成后的效果如图: \",\"如需创建新隧道,点击下方的新建隧道(点击展开)摁钮:\",\"img\",\"在左方选择欲使用的节点,一般来说越靠近玩家的节点延迟会越低; 同时在右侧配置相应的信息:\",\"img\",\"选择完配置后,点击新建隧道摁钮,输入隧道名:\",\"img\",\"提示创建成功后,在左边选择刚创建的隧道:\",\"img\",\"img\",\"回到主窗口,点击启动内网映射摁钮即可启动:\",\"img\",\"img\",\"输出的最后一条即为可供链接的地址和端口.\"]},\"12\":{\"h\":\"关于\"},\"13\":{\"h\":\"MSLTeam是一个 ,下面是主要成员:\"},\"14\":{\"h\":\"点对点联机教程\",\"t\":[\"TIPS\",\"点对点联机功能无法穿透所有类型的NAT，如果你无法成功联机，请使用内网映射功能\",\"由于Minecraft的限制，可能仅正版用户才能成功联机，若你是离线用户，请开服务器进行联机\"]},\"15\":{\"h\":\"房主部分\",\"t\":[\"启动游戏，进入一个单人世界\",\"按ESC，呼出游戏菜单\",\"点击“对局域网络开放”\",\"点击“创建一个局域网世界”\",\"游戏左下角会给你一个端口，将此端口填入点对点联机的端口中\",\"点对点联机中的QQ号填你自己的即可，密钥为其他玩家加入房间需填写的密码\",\"配置完成后，点击“开启房间”，即可让你的朋友加入\"]},\"16\":{\"h\":\"成员部分\",\"t\":[\"将房主给你的QQ号，密钥填入开服器\",\"端口号默认为25565即可，成员无需像房主那样更改端口号\",\"配置完成后，点击“加入房间”，即可进行连接\",\"连接成功后，进入和房主版本一致的Minecraft\",\"点击“多人游戏”\",\"点击“直接连接”（或“添加服务器”）\",\"在地址栏填写127.0.0.1（如果你更改了端口号，请在127.0.0.1后面加上半角冒号+你更改后的端口号，如：127.0.0.1:12337）\",\"然后即可成功联机\"]},\"17\":{\"h\":\"MSL本体配置\",\"t\":[\"芝士MSL的设置页面:\",\"img\",\"最顶上四个摁钮不再一一介绍.\",\"在自动化选项中可以设置一些自启动功能\",\"在右侧选择服务器后可以将其添加至自启动列表,点击上面的开关可以切换是否启用功能\",\"自动更新MSL功能的实际效果为在检测到有更新时不提示静默下载.\",\"往下翻还有皮肤选项:\",\"img\",\"随你喜好调整:-)\"]},\"18\":{\"h\":\"使用MSL开服\"},\"19\":{\"h\":\"视频教程\"},\"20\":{\"h\":\"\",\"t\":[\"404 Not Found\"]}},\"dirtCount\":0,\"index\":[[\"found\",{\"1\":{\"20\":1}}],[\"frp\",{\"1\":{\"10\":1}}],[\"not\",{\"1\":{\"20\":1}}],[\"404\",{\"1\":{\"20\":1}}],[\"视频教程\",{\"0\":{\"19\":1}}],[\"随你喜好调整\",{\"1\":{\"17\":1}}],[\"往下翻还有皮肤选项\",{\"1\":{\"17\":1}}],[\"自动更新msl功能的实际效果为在检测到有更新时不提示静默下载\",{\"1\":{\"17\":1}}],[\"最顶上四个摁钮不再一一介绍\",{\"1\":{\"17\":1}}],[\"最终用户许可协议所禁止的行为\",{\"1\":{\"4\":1}}],[\"最终用户许可协议和网易在中国大陆实行的相关政策\",{\"1\":{\"4\":1}}],[\"芝士msl的设置页面\",{\"1\":{\"17\":1}}],[\"然后即可成功联机\",{\"1\":{\"16\":1}}],[\"然后在右侧把motd一项改为想要的值即可\",{\"1\":{\"8\":1}}],[\"12337\",{\"1\":{\"16\":1}}],[\"127\",{\"1\":{\"16\":1}}],[\"1后面加上半角冒号+你更改后的端口号\",{\"1\":{\"16\":1}}],[\"1\",{\"1\":{\"16\":2}}],[\"0\",{\"1\":{\"16\":6}}],[\"添加服务器\",{\"1\":{\"16\":1}}],[\"直接连接\",{\"1\":{\"16\":1}}],[\"多人游戏\",{\"1\":{\"16\":1}}],[\"进入和房主版本一致的minecraft\",{\"1\":{\"16\":1}}],[\"进入一个单人世界\",{\"1\":{\"15\":1}}],[\"连接成功后\",{\"1\":{\"16\":1}}],[\"加入房间\",{\"1\":{\"16\":1}}],[\"成员无需像房主那样更改端口号\",{\"1\":{\"16\":1}}],[\"成员部分\",{\"0\":{\"16\":1}}],[\"端口号默认为25565即可\",{\"1\":{\"16\":1}}],[\"密钥填入开服器\",{\"1\":{\"16\":1}}],[\"密钥为其他玩家加入房间需填写的密码\",{\"1\":{\"15\":1}}],[\"将房主给你的qq号\",{\"1\":{\"16\":1}}],[\"将此端口填入点对点联机的端口中\",{\"1\":{\"15\":1}}],[\"即可进行连接\",{\"1\":{\"16\":1}}],[\"即可让你的朋友加入\",{\"1\":{\"15\":1}}],[\"即表示用户同意本协议所做的所有修订或更新\",{\"1\":{\"5\":1}}],[\"开启房间\",{\"1\":{\"15\":1}}],[\"开发者享有对本协议条款的解释权\",{\"1\":{\"6\":1}}],[\"开发者将在重要页面展示修改内容\",{\"1\":{\"5\":1}}],[\"开发者将会在相关页面上通告修改内容\",{\"1\":{\"0\":1}}],[\"开发者有权在必要的时候修改本协议\",{\"1\":{\"5\":1}}],[\"开发者有权决定保留或不保留服务器上的全部或部分数据\",{\"1\":{\"4\":1}}],[\"开发者有权终止或中断本软件全部或部分服务\",{\"1\":{\"2\":1}}],[\"开发者有权终止对用户提供服务\",{\"1\":{\"2\":1}}],[\"开发者拥有用户在使用本软件过程中所产生的的任何数据信息\",{\"1\":{\"4\":1}}],[\"开发者对本软件实现的功能不提供任何保证和法律支持\",{\"1\":{\"3\":1}}],[\"开发者对用户或第三人均不承担任何责任\",{\"1\":{\"2\":1}}],[\"开发者概不负责\",{\"1\":{\"3\":1}}],[\"开发者不行使\",{\"1\":{\"6\":1}}],[\"开发者不承担任何责任\",{\"1\":{\"5\":1}}],[\"开发者不对这些第三方服务的正确性\",{\"1\":{\"3\":1}}],[\"开发者不对本软件提供任何保证\",{\"1\":{\"3\":1}}],[\"开发者不保证本软件及服务一定能满足用户需求\",{\"1\":{\"3\":1}}],[\"开发者可以采取公告的形式通知用户\",{\"1\":{\"2\":1}}],[\"开发者可能随时更新本协议\",{\"1\":{\"0\":1}}],[\"开发者保留在其认为有必要的情况下终止或部分终止本软件及服务的权利\",{\"1\":{\"2\":1}}],[\"开发者应终止对用户提供服务\",{\"1\":{\"2\":1}}],[\"开发者\",{\"1\":{\"0\":1}}],[\"配置完成后\",{\"1\":{\"15\":1,\"16\":1}}],[\"游戏左下角会给你一个端口\",{\"1\":{\"15\":1}}],[\"创建一个局域网世界\",{\"1\":{\"15\":1}}],[\"呼出游戏菜单\",{\"1\":{\"15\":1}}],[\"按esc\",{\"1\":{\"15\":1}}],[\"启动游戏\",{\"1\":{\"15\":1}}],[\"房主部分\",{\"0\":{\"15\":1}}],[\"若你是离线用户\",{\"1\":{\"14\":1}}],[\"若用户在本协议修订后因未熟悉变更而引起的损失\",{\"1\":{\"5\":1}}],[\"若用户在本协议修订后仍继续使用本软件及服务\",{\"1\":{\"5\":1}}],[\"若用户不同意本协议的修订或更新\",{\"1\":{\"5\":1}}],[\"若用户使用本软件实现的功能进行违法犯罪或其他不正当的行为\",{\"1\":{\"3\":1}}],[\"若用户使用第三方服务导致财产损毁\",{\"1\":{\"3\":1}}],[\"可能仅正版用户才能成功联机\",{\"1\":{\"14\":1}}],[\"可能引起误会地\",{\"1\":{\"1\":1}}],[\"由于minecraft的限制\",{\"1\":{\"14\":1}}],[\"tips\",{\"1\":{\"14\":1}}],[\"点对点联机中的qq号填你自己的即可\",{\"1\":{\"15\":1}}],[\"点对点联机功能无法穿透所有类型的nat\",{\"1\":{\"14\":1}}],[\"点对点联机教程\",{\"0\":{\"14\":1}}],[\"点击上面的开关可以切换是否启用功能\",{\"1\":{\"17\":1}}],[\"点击\",{\"1\":{\"15\":3,\"16\":3}}],[\"点击新建隧道摁钮\",{\"1\":{\"11\":1}}],[\"点击展开\",{\"1\":{\"11\":1}}],[\"点击下方的新建隧道\",{\"1\":{\"11\":1}}],[\"点击启动内网映射摁钮即可启动\",{\"1\":{\"10\":1,\"11\":1}}],[\"点击确定会保存配置并返回主窗口\",{\"1\":{\"10\":1}}],[\"点击图中的配置摁钮\",{\"1\":{\"10\":1,\"11\":1}}],[\"关于\",{\"0\":{\"12\":1}}],[\"输出的最后一条即为可供链接的地址和端口\",{\"1\":{\"11\":1}}],[\"输入隧道名\",{\"1\":{\"11\":1}}],[\"提示创建成功后\",{\"1\":{\"11\":1}}],[\"提供的\",{\"1\":{\"0\":1}}],[\"选择完配置后\",{\"1\":{\"11\":1}}],[\"同时在右侧配置相应的信息\",{\"1\":{\"11\":1}}],[\"一般来说越靠近玩家的节点延迟会越低\",{\"1\":{\"11\":1}}],[\"摁钮\",{\"1\":{\"11\":1}}],[\"登陆完成后的效果如图\",{\"1\":{\"11\":1}}],[\"登录\",{\"1\":{\"11\":1}}],[\"并根据提示注册\",{\"1\":{\"11\":1}}],[\"并且排除一切冲突法规规定地适用\",{\"1\":{\"6\":1}}],[\"并且对本软件及服务的正确性\",{\"1\":{\"3\":1}}],[\"使用msl开服\",{\"0\":{\"18\":1}}],[\"使用openfrp\",{\"0\":{\"11\":1}}],[\"使用须知\",{\"0\":{\"1\":1}}],[\"回到主窗口\",{\"1\":{\"10\":1,\"11\":1}}],[\"在右侧选择服务器后可以将其添加至自启动列表\",{\"1\":{\"17\":1}}],[\"在右侧填写好信息即可\",{\"1\":{\"10\":1}}],[\"在自动化选项中可以设置一些自启动功能\",{\"1\":{\"17\":1}}],[\"在地址栏填写127\",{\"1\":{\"16\":1}}],[\"在左边选择刚创建的隧道\",{\"1\":{\"11\":1}}],[\"在左方选择欲使用的节点\",{\"1\":{\"11\":1}}],[\"在左侧选择节点\",{\"1\":{\"10\":1}}],[\"在上方选择openfrp\",{\"1\":{\"11\":1}}],[\"在上方选择msl\",{\"1\":{\"10\":1}}],[\"在法律许可范围内\",{\"1\":{\"3\":1,\"6\":1}}],[\"打开新窗口\",{\"1\":{\"10\":1,\"11\":1}}],[\"内网穿透配置\",{\"0\":{\"9\":1}}],[\"下面是主要成员\",{\"0\":{\"13\":1}}],[\"下方的快捷指令栏依照自己的需求调整即可\",{\"1\":{\"8\":1}}],[\"下载服务由\",{\"1\":{\"4\":1}}],[\"改完记得点保存\",{\"1\":{\"8\":1}}],[\"修改客户端服务器选择界面上显示的服务器介绍可以点击修改更多配置\",{\"1\":{\"8\":1}}],[\"修改后的本协议一旦在页面上公布即有效代替原用户协议书\",{\"1\":{\"0\":1}}],[\"此处为服务器本体相关设置\",{\"1\":{\"8\":1}}],[\"此外\",{\"1\":{\"1\":1}}],[\"除非jvm是你亲生的你对怎么改很有自信\",{\"1\":{\"8\":1}}],[\"除非法律允许或开发者书面许可\",{\"1\":{\"1\":1}}],[\"插件无关\",{\"1\":{\"8\":1}}],[\"插件等内容\",{\"1\":{\"4\":1}}],[\"否则很容易导致服务器无法开启\",{\"1\":{\"8\":1}}],[\"建议选择一个自己能区分的即可\",{\"1\":{\"8\":1}}],[\"实际上与开服无关\",{\"1\":{\"8\":1}}],[\"img\",{\"1\":{\"8\":3,\"10\":3,\"11\":9,\"17\":2}}],[\"服务器jvm参数一般不需要改动\",{\"1\":{\"8\":1}}],[\"服务器存放目录和服务端核心文件建议一旦配置完成就不要随意改动\",{\"1\":{\"8\":1}}],[\"服务器名称是显示的名称\",{\"1\":{\"8\":1}}],[\"服务器相关配置\",{\"0\":{\"8\":1}}],[\"服务的变更或中止\",{\"0\":{\"2\":1}}],[\"com\",{\"1\":{\"6\":1}}],[\"curseforge\",{\"1\":{\"4\":1}}],[\"qq\",{\"1\":{\"6\":1}}],[\"邮件请发送至邮箱2035582067\",{\"1\":{\"6\":1}}],[\"举报各类违法违规行为\",{\"1\":{\"6\":1}}],[\"也不得影响开发者在将来行使该等权利\",{\"1\":{\"6\":1}}],[\"也不保证服务不会被中断\",{\"1\":{\"3\":1}}],[\"未能及时行使或者充分行使本协议或者依照法律规定所享有的权利\",{\"1\":{\"6\":1}}],[\"其他规定\",{\"0\":{\"6\":1}}],[\"其最终解释权归microsoft公司和mojangab工作室所有\",{\"1\":{\"4\":1}}],[\"敬请定期查询\",{\"1\":{\"5\":1}}],[\"条款变更\",{\"0\":{\"5\":1}}],[\"相关法律法规及其他软件使用规则使用上述数据\",{\"1\":{\"4\":1}}],[\"相关争议应由第三方服务提供方承担\",{\"1\":{\"3\":1}}],[\"的所有权\",{\"1\":{\"4\":1}}],[\"的权益\",{\"1\":{\"0\":1}}],[\"应用程序数据及系统衍生数据等\",{\"1\":{\"4\":1}}],[\"版权归服务提供商所有\",{\"1\":{\"4\":1}}],[\"版权依照第三方平台规定处理\",{\"1\":{\"4\":1}}],[\"版权或知识产权被侵犯等问题\",{\"1\":{\"3\":1}}],[\"等第三方平台提供\",{\"1\":{\"4\":1}}],[\"spigot\",{\"1\":{\"4\":1}}],[\"server\",{\"1\":{\"0\":1}}],[\"模组\",{\"1\":{\"4\":1}}],[\"均为开发者或者指定版权方所有\",{\"1\":{\"4\":1}}],[\"均由第三方提供\",{\"1\":{\"3\":1}}],[\"专利权及其他知识产权\",{\"1\":{\"4\":1}}],[\"知识产权\",{\"0\":{\"4\":1}}],[\"所造成的风险和法律后果均由用户自行承担\",{\"1\":{\"3\":1}}],[\"通过本软件桥接进行联机等\",{\"1\":{\"3\":1}}],[\"这些第三方服务与开发者和本软件无关\",{\"1\":{\"3\":1}}],[\"合法性等负责\",{\"1\":{\"3\":1}}],[\"安全性\",{\"1\":{\"3\":1}}],[\"安全性等方面不提供任何担保\",{\"1\":{\"3\":1}}],[\"文件下载等服务\",{\"1\":{\"3\":1}}],[\"包括但不限于账号资料\",{\"1\":{\"4\":1}}],[\"包括但不限于\",{\"1\":{\"4\":1}}],[\"包括但不限于使用本软件开启的minecraft服务器\",{\"1\":{\"3\":1}}],[\"包括但不限于内网映射\",{\"1\":{\"3\":1}}],[\"包括但不限于损害\",{\"1\":{\"1\":1}}],[\"免责声明\",{\"0\":{\"3\":1}}],[\"但开发者不承担对用户造成的任何损失\",{\"1\":{\"2\":1}}],[\"但本软件内不允许出现包括但不限于涉及种族\",{\"1\":{\"1\":1}}],[\"第三方原因或其他不可抗力的情形\",{\"1\":{\"2\":1}}],[\"无法正常工作\",{\"1\":{\"2\":1}}],[\"因政策因素\",{\"1\":{\"2\":1}}],[\"因网络提供商线路或其他故障\",{\"1\":{\"2\":1}}],[\"因突发性的软硬件设备与电子通信设备故障\",{\"1\":{\"2\":1}}],[\"因服务器遭受损害\",{\"1\":{\"2\":1}}],[\"因本软件及服务自身的需要\",{\"1\":{\"2\":1}}],[\"发生下列情形之一时\",{\"1\":{\"2\":1}}],[\"中止与终止\",{\"1\":{\"2\":1}}],[\"该不正当行为的具体情形在本协议中有明确约定\",{\"1\":{\"2\":1}}],[\"以及其他违反法律禁止性规定的行为\",{\"1\":{\"2\":1}}],[\"以下简称本协议\",{\"1\":{\"0\":1}}],[\"以下简称\",{\"1\":{\"0\":2}}],[\"严重违背社会公德\",{\"1\":{\"2\":1}}],[\"对局域网络开放\",{\"1\":{\"15\":1}}],[\"对因此造成的不便与损害\",{\"1\":{\"2\":1}}],[\"对本软件及服务的中断\",{\"1\":{\"2\":1}}],[\"对用户服务的中止与终止\",{\"1\":{\"2\":1}}],[\"对您做出包括但不限于终止服务等处理措施\",{\"1\":{\"1\":1}}],[\"删除本软件及其副本上关于著作权的信息\",{\"1\":{\"1\":1}}],[\"攻击服务器或使服务器过度负荷等\",{\"1\":{\"1\":1}}],[\"攻击性的\",{\"1\":{\"1\":1}}],[\"采取任何可能影响本软件网络服务的非正常使用行为\",{\"1\":{\"1\":1}}],[\"故意传播计算机病毒等破坏性程序\",{\"1\":{\"1\":1}}],[\"不应被视为放弃行使该权利\",{\"1\":{\"6\":1}}],[\"不得将游戏本体内容用于商业用途\",{\"1\":{\"4\":1}}],[\"不会也不能承担任何法律责任\",{\"1\":{\"3\":1}}],[\"不代表开发者及本软件的立场\",{\"1\":{\"3\":1}}],[\"不恰当地使用本软件及服务\",{\"1\":{\"1\":1}}],[\"不合法\",{\"1\":{\"1\":1}}],[\"行政法规禁止的其他内容的\",{\"1\":{\"1\":1}}],[\"含有中华人民共和国法律\",{\"1\":{\"1\":1}}],[\"侵害他人合法权益的\",{\"1\":{\"1\":1}}],[\"侮辱或者诽谤他人\",{\"1\":{\"1\":1}}],[\"侮辱性的\",{\"1\":{\"1\":1}}],[\"恐怖或者教唆犯罪的\",{\"1\":{\"1\":1}}],[\"恐吓\",{\"1\":{\"1\":1}}],[\"凶杀\",{\"1\":{\"1\":1}}],[\"暴力\",{\"1\":{\"1\":1}}],[\"赌博\",{\"1\":{\"1\":1}}],[\"色情\",{\"1\":{\"1\":1}}],[\"散布淫秽\",{\"1\":{\"1\":1}}],[\"散布谣言\",{\"1\":{\"1\":1}}],[\"扰乱社会秩序\",{\"1\":{\"1\":1}}],[\"宣扬邪教和封建迷信的\",{\"1\":{\"1\":1}}],[\"破坏本软件系统或网站的正常运行\",{\"1\":{\"1\":1}}],[\"破坏社会稳定的\",{\"1\":{\"1\":1}}],[\"破坏国家宗教政策\",{\"1\":{\"1\":1}}],[\"破坏国家统一的\",{\"1\":{\"1\":1}}],[\"破坏民族团结的\",{\"1\":{\"1\":1}}],[\"民族歧视\",{\"1\":{\"1\":1}}],[\"煽动民族仇恨\",{\"1\":{\"1\":1}}],[\"损害国家荣誉和利益的\",{\"1\":{\"1\":1}}],[\"颠覆国家政权\",{\"1\":{\"1\":1}}],[\"泄露国家机密\",{\"1\":{\"1\":1}}],[\"危害国家安全\",{\"1\":{\"1\":1}}],[\"反对中华人民共和国宪法所确定的基本原则的\",{\"1\":{\"1\":1}}],[\"或\",{\"1\":{\"16\":1}}],[\"或实施其他被\",{\"1\":{\"4\":1}}],[\"或者追究您的刑事责任\",{\"1\":{\"1\":1}}],[\"或称\",{\"1\":{\"0\":1}}],[\"情节严重的开发者将移交有关行政管理机关给予行政处罚\",{\"1\":{\"1\":1}}],[\"依据本协议及法律法规\",{\"1\":{\"1\":1}}],[\"则可以尝试调整java相关选项\",{\"1\":{\"8\":1}}],[\"则开发者有权视情节严重程度\",{\"1\":{\"1\":1}}],[\"则应视为用户已经详细阅读并同意本协议的全部内容\",{\"1\":{\"0\":1}}],[\"如\",{\"1\":{\"16\":1}}],[\"如需创建新隧道\",{\"1\":{\"11\":1}}],[\"如果你更改了端口号\",{\"1\":{\"16\":1}}],[\"如果你无法成功联机\",{\"1\":{\"14\":1}}],[\"如果出现乱码可以尝试调整输入输出编码\",{\"1\":{\"8\":1}}],[\"如果提示分页文件过小则可以手动调整服务器运行内存但是我们还是建议你加钱上更多内存条\",{\"1\":{\"8\":1}}],[\"如果服务器开启失败且能确定和所安装的服务端\",{\"1\":{\"8\":1}}],[\"如果用户是中华人民共和国境外的使用者\",{\"1\":{\"1\":1}}],[\"如您发布下述任何内容\",{\"1\":{\"1\":1}}],[\"违禁药品等内容\",{\"1\":{\"1\":1}}],[\"工作人员\",{\"1\":{\"1\":1}}],[\"诽谤\",{\"1\":{\"1\":1}}],[\"粗俗内容\",{\"1\":{\"1\":1}}],[\"淫秽\",{\"1\":{\"1\":1}}],[\"国家领导人\",{\"1\":{\"1\":1}}],[\"国家政治\",{\"1\":{\"1\":1}}],[\"宗教或宗教人物\",{\"1\":{\"1\":1}}],[\"宗教\",{\"1\":{\"1\":1}}],[\"还应遵守所属国家或地区的法律法规\",{\"1\":{\"1\":1}}],[\"与开发者无关\",{\"1\":{\"1\":1}}],[\"用户可以通过电子邮件投诉\",{\"1\":{\"6\":1}}],[\"用户可以主动停止使用本软件及服务\",{\"1\":{\"5\":1}}],[\"用户仅有权依据本协议\",{\"1\":{\"4\":1}}],[\"用户理解并同意\",{\"1\":{\"3\":5,\"4\":1}}],[\"用户使用本软件所造成的的风险均由用户自行承担\",{\"1\":{\"3\":1}}],[\"用户使用本软件所开启服务器的相关信息由用户自行设置\",{\"1\":{\"1\":1}}],[\"用户使用本软件的第三方修改版本的\",{\"1\":{\"2\":1}}],[\"用户在接受本软件服务时实施不正当行为的\",{\"1\":{\"2\":1}}],[\"用户有发布违法信息\",{\"1\":{\"2\":1}}],[\"用户不得从事下列任何行为\",{\"1\":{\"1\":1}}],[\"用户不得发布下列任何内容\",{\"1\":{\"1\":1}}],[\"用户与其他未授权的非官方个人之间产生的任何交易与纠纷\",{\"1\":{\"1\":1}}],[\"用户应当遵守本软件的开源协议\",{\"1\":{\"4\":1}}],[\"用户应当遵守\",{\"1\":{\"4\":1}}],[\"用户应当自行承担其所发布的信息内容所涉及的法律责任\",{\"1\":{\"1\":1}}],[\"用户应遵守中华人民共和国相关法律法规\",{\"1\":{\"1\":1}}],[\"用户应为其使用本软件产生的行为\",{\"1\":{\"1\":1}}],[\"用户应自行承担风险与法律责任\",{\"1\":{\"2\":1}}],[\"用户应自行负担连接互联网后所需支付的相关电话\",{\"1\":{\"1\":1}}],[\"用户应自行配备本软件和本软件所实现功能所需要的硬件和软件配置\",{\"1\":{\"1\":1}}],[\"结果承担法律责任\",{\"1\":{\"1\":1}}],[\"事件\",{\"1\":{\"1\":1}}],[\"宽带使用等费用\",{\"1\":{\"1\":1}}],[\"且同意遵守本协议的规定\",{\"1\":{\"0\":1}}],[\"当用户开始使用本软件时\",{\"1\":{\"0\":1}}],[\"请在127\",{\"1\":{\"16\":1}}],[\"请在左边选择你想查看的帮助内容噢~\",{\"1\":{\"7\":1}}],[\"请开服务器进行联机\",{\"1\":{\"14\":1}}],[\"请使用内网映射功能\",{\"1\":{\"14\":1}}],[\"请用户仔细阅读以下全部内容\",{\"1\":{\"0\":1}}],[\"请您在使用本软件前\",{\"1\":{\"0\":1}}],[\"本协议适用于中华人民共和国法律\",{\"1\":{\"6\":1}}],[\"本协议一旦发生变动\",{\"1\":{\"0\":1,\"5\":1}}],[\"本软件提供的所有服务器上的数据均归开发者所有\",{\"1\":{\"4\":1}}],[\"本软件提供的游戏资源\",{\"1\":{\"4\":1}}],[\"本软件是开源软件\",{\"1\":{\"4\":1}}],[\"本软件使用的其他第三方服务\",{\"1\":{\"4\":1}}],[\"本软件为游戏minecraft的服务器辅助工具\",{\"1\":{\"4\":1}}],[\"本软件所使用的第三方服务归相关版权方所有\",{\"1\":{\"4\":1}}],[\"本软件著作权\",{\"1\":{\"4\":1}}],[\"本软件不对第三方服务内容提供担保\",{\"1\":{\"3\":1}}],[\"本软件内存在的第三方服务\",{\"1\":{\"3\":1}}],[\"本软件\",{\"1\":{\"0\":1}}],[\"详细阅读本协议的所有内容\",{\"1\":{\"0\":1}}],[\"特制定本用户使用协议书\",{\"1\":{\"0\":1}}],[\"您\",{\"1\":{\"0\":1}}],[\"为了保障用户\",{\"1\":{\"0\":1}}],[\"软件与服务\",{\"1\":{\"0\":1}}],[\"launcher\",{\"1\":{\"0\":1}}],[\"mods\",{\"1\":{\"8\":1}}],[\"msl本体配置\",{\"0\":{\"17\":1}}],[\"mslteam是一个\",{\"0\":{\"13\":1}}],[\"msl自带\",{\"0\":{\"10\":1}}],[\"msl帮助文档\",{\"0\":{\"7\":1}}],[\"msl用户使用协议\",{\"0\":{\"0\":1}}],[\"minecraft\",{\"1\":{\"0\":1,\"4\":2}}],[\"欢迎使用mslteam\",{\"1\":{\"0\":1}}]],\"serializationVersion\":2}}")).map(([e,t])=>[e,wt(t,{fields:["h","t","c"],storeFields:["h","t","c"]})]));self.onmessage=({data:{type:e="all",query:t,locale:s,options:n}})=>{e==="suggest"?self.postMessage(st(t,k[s],n)):e==="search"?self.postMessage(et(t,k[s],n)):self.postMessage({suggestions:st(t,k[s],n),results:et(t,k[s],n)})};
//# sourceMappingURL=index.js.map
