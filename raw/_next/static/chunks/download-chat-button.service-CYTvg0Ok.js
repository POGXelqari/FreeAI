const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_next/static/chunks/marked.esm-BIum_moM.js","_next/static/chunks/rolldown-runtime-C0FnF6B9.js","_next/static/chunks/react-dom-server-woWt0y2j.js","_next/static/chunks/framework-D-uKrMmN.js","_next/static/chunks/sanitize-html.util-BCWuoeSx.js","_next/static/chunks/purify.es-DTy1PD66.js","_next/static/chunks/html2pdf-64f5Xxph.js"])))=>i.map(i=>d[i]);
import{o as e}from"./rolldown-runtime-C0FnF6B9.js";import{i as t}from"./framework-D-uKrMmN.js";import{$ as n,Q as r,nt as i,rt as a}from"./vinext-DaPQ-kLo.js";import{n as o}from"./QueryClientProvider-DGxN9XtP.js";import{o as s}from"./rest-api-BL5a3YVm.js";import{n as c}from"./react-client-DI5BViDH.js";import{t as l}from"./project-key.constant-DL2-hOys.js";import{n as u}from"./better-auth-client-session.service-1Lowatea.js";import{n as d}from"./worker-auth.service-oGq_wKdT.js";import{t as f}from"./chat-key.constant-DXJEa87X.js";import{N as p,T as m,k as h,t as g}from"./analytics.service-9oUGcSKY.js";import{a as _}from"./mixpanel-B_WP0jc-.js";import{t as v}from"./show-toast.service-DZQBgdNF.js";import{r as y}from"./message-reducer.service-BcIDAcUg.js";import{t as b}from"./global.store-DXaW4jb5.js";import{t as x}from"./share-chat-invite.api-DKLG9zAF.js";import{t as S}from"./deep-research-chats.model-Bm4CwR0q.js";import{t as C}from"./review-trigger.store-CzZ64ny6.js";import{t as w}from"./copy-formatted.util-SR1wwy9I.js";import{r as T,t as E}from"./first-party-url.util-CX2n5k9d.js";import{t as D}from"./image-compression.util-dcofMV1t.js";import{t as O}from"./logo-icon-C5Mo55YO.js";var k=()=>{let e=o(),t=c(`Chat`),{showToast:n}=v(),{data:r}=u(),i=r?.user?.id;return{deleteChat:async(r,a)=>{if(!r)return;let{onDeleteNavigateTo:o}=a||{};e.setQueryData([f.CHAT_HISTORY_QUERY,i],e=>e?.pages?{...e,pages:e.pages.map(e=>({...e,chats:e.chats?.filter(e=>e.id!==r)||[]}))}:e),e.setQueryData([l.PROJECTS_QUERY,i],e=>e?.projects?{...e,projects:e.projects.map(e=>({...e,chats:e.chats?.filter(e=>e.id!==r)||[]}))}:e),e.setQueryData([f.SHARED_CHATS_QUERY,i],e=>e?.chats?{...e,chats:e.chats.filter(e=>e.id!==r)}:e),e.setQueriesData({queryKey:[S.DEEP_RESEARCH_CHATS_QUERY]},e=>e?.pages?{...e,pages:e.pages.map(e=>({...e,chats:e.chats?.filter(e=>e.id!==r)||[]}))}:e),o?.();try{let e=await d(),t=new URLSearchParams({id:r});if(!(await s.delete(`chat?${t.toString()}`,{headers:{...e}})).ok)throw Error(`Failed to delete chat`);try{await x(r)}catch{}g.track(_.CHAT_DELETED,{chat_id:r,chat_type:`private`})}catch{e.invalidateQueries({queryKey:[f.CHAT_HISTORY_QUERY]}),e.invalidateQueries({queryKey:[f.SHARED_CHATS_QUERY]}),e.invalidateQueries({queryKey:[l.PROJECTS_QUERY,i]}),e.invalidateQueries({queryKey:[S.DEEP_RESEARCH_CHATS_QUERY]}),n({description:t(`chat_delete_error`),variant:`error`})}}}};function A(e,t){let{embedImages:n,userLabel:r,assistantLabel:i,getImageBytes:a}=t;return e.filter(e=>e.role===`user`||e.role===`assistant`).map(e=>{let t=e.parts??[],o=t.filter(e=>e.type===`text`).map(e=>e.text);for(let e of t)if(e.type===`tool-deepResearch`&&e.state===`output-available`){let t=e.output;(t?.format===`report`||t?.format===`parallel-report`)&&t.content?(t.title&&o.push(`# ${t.title}`),o.push(t.content)):t?.format===`clarifying_questions`&&t.answer&&o.push(t.answer)}let s=o.join(`

`).trim(),c=[];if(e.role===`user`)for(let e of t){if(e.type!==`file`)continue;let t=e.filename||``;e.isPastedText?c.push(`[Pasted text${t?`: ${t}`:``}]`):e.mediaType?.startsWith(`image/`)?c.push(`[Image${t?`: ${t}`:``}]`):c.push(`[File${t?`: ${t}`:``}]`)}else for(let e of t)if(e.type===`tool-image-google`||e.type===`tool-image-upscale`){if(n)(e.output?.images??[]).forEach((t,n)=>{let r=t.mimeType||`image/png`,i=t.base64??a?.(e.toolCallId,n);t.url?c.push(`![Generated image](${t.url})`):i?c.push(`![Generated image](data:${r};base64,${i})`):c.push(`[Generated image]`)});else{let t=e.output?.images?.length??0;c.push(t>1?`[${t} generated images]`:`[Generated image]`)}}else if(e.type===`tool-CREATE_IMAGE`){let t=typeof e.output==`string`&&e.output.startsWith(`http`)?e.output:void 0;c.push(n&&t?`![Generated image](${t})`:`[Generated image]`)}else!n&&e.type===`tool-background-removal`&&c.push(`[Background removal result]`);let l=e.role===`user`?`**${r}:**`:`**${i}:**`,u=[];e.role===`user`?(c.length>0&&u.push(c.join(` `)),s&&u.push(s)):(s&&u.push(s),c.length>0&&u.push(c.join(` `)));let d=u.join(`

`);return d?`${l} ${d}`:null}).filter(Boolean).join(`

`)}var j=e=>{let t=b(e=>e.currentChatId),i=b(e=>e.currentMessages),a=b(e=>e.isImageCreationHeroVisible),o=b(e=>e.isBackgroundRemovalHeroVisible),s=r(),l=n(),{data:d}=u(),{showToast:f}=v(),y=c(`Chat`),x=!!(d?.user?.id&&d?.user?.type!==`guest`),S=s.chatId||s.id||t,T=!!l?.includes(`/image-enhancer`),E=a||o||T||!!S&&p(S)||!!S&&m(S)||!!S&&h(S);return{chatId:S,shouldShow:x&&!!S&&i.length>0&&!E,isDisabled:!1,handleCopyChat:async()=>{if(i.length===0){f({title:y(`toast_title_no_text_to_copy`),description:y(`toast_description_no_text_to_copy`),variant:`error`});return}if(!i.filter(e=>e.role===`assistant`).some(e=>{let t=e.parts??[];return t.some(e=>e.type===`text`&&!!e.text?.trim())?!0:t.some(e=>e.type===`tool-deepResearch`&&e.state===`output-available`&&(e.output?.content||e.output?.answer))})){f({title:y(`toast_title_no_text_to_copy`),description:y(`toast_description_no_text_to_copy`),variant:`error`});return}let t=A(i,{embedImages:!1,userLabel:y(`chat_export_user_label`),assistantLabel:y(`chat_export_assistant_label`)});if(!t.trim()){f({title:y(`toast_title_no_text_to_copy`),description:y(`toast_description_no_text_to_copy`),variant:`error`});return}await w(t)&&(g.track(_.COPY_CHAT_CLICKED,{chat_id:S??``,message_count:i.length,source:e}),C.getState().scheduleReviewModalTrigger(7e3,`copy-chat`),f({description:y(`toast_chat_copied_to_clipboard`),variant:`simple`}))}}},M={maxDimension:1024,maxFileSize:1048576,initialQuality:.85},N=e=>new Promise((t,n)=>{let r=new FileReader;r.onloadend=()=>t(r.result),r.onerror=n,r.readAsDataURL(e)}),P=async e=>{let t=/!\[([^\]]*)\]\(([^)]+)\)/g,n=Array.from(new Set(Array.from(e.matchAll(t),e=>e[2])));if(n.length===0)return e;let r=new Map;return await Promise.all(n.map(async e=>{try{if(e.startsWith(`data:`)){r.set(e,e);return}if(!E(e))return;let t=await fetch(T(e));if(!t.ok)return;let n=await t.blob();if(!n.type.startsWith(`image/`))return;let i=new File([n],`chat-image`,{type:n.type}),{file:a}=await D(i,M),o=await N(a);r.set(e,o)}catch{}})),e.replace(t,(e,t,n)=>{let i=r.get(n);return i?`![${t}](${i})`:`[Image${t?`: ${t}`:``}]`})},F=e(t(),1);a();var I=e=>e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`),L=(e,t,n,r,i)=>{let a=r(n.parse(e,{async:!1}));return`<div id="chat-pdf-root" style="
    font-family: Arial, 'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji', sans-serif;
    max-width: 760px;
    margin: 0 auto;
    padding: 0 4px;
    line-height: 1.6;
    direction: ltr;
    color: #333;
    background: #fff;
  ">
    <style>
      #chat-pdf-root h1, #chat-pdf-root h2, #chat-pdf-root h3, #chat-pdf-root h4,
      #chat-pdf-root p, #chat-pdf-root li, #chat-pdf-root blockquote,
      #chat-pdf-root th, #chat-pdf-root td {
        unicode-bidi: plaintext;
        text-align: start;
      }
      #chat-pdf-root h1, #chat-pdf-root h2, #chat-pdf-root h3, #chat-pdf-root h4 {
        color: #2c3e50;
        margin-top: 24px;
      }
      #chat-pdf-root h1 { border-bottom: 3px solid #3498db; padding-bottom: 12px; font-size: 1.8em; }
      #chat-pdf-root h2 { border-bottom: 1px solid #bdc3c7; padding-bottom: 8px; font-size: 1.5em; }
      #chat-pdf-root h3 { font-size: 1.25em; }
      #chat-pdf-root p { margin-bottom: 12px; }
      #chat-pdf-root ul, #chat-pdf-root ol { margin-left: 20px; margin-bottom: 12px; }
      #chat-pdf-root li { margin-bottom: 6px; }
      #chat-pdf-root blockquote {
        border-left: 4px solid #3498db;
        margin: 16px 0;
        background-color: #f8f9fa;
        padding: 12px 16px;
        font-style: italic;
      }
      #chat-pdf-root strong, #chat-pdf-root b { font-weight: 700; color: #2c3e50; }
      #chat-pdf-root em { color: #7f8c8d; }
      #chat-pdf-root a { color: #3498db; text-decoration: none; word-break: break-word; }
      #chat-pdf-root table {
        border-collapse: collapse;
        width: 100%;
        margin: 16px 0;
        border: 1px solid #bdc3c7;
      }
      #chat-pdf-root th, #chat-pdf-root td {
        border: 1px solid #bdc3c7;
        padding: 8px 10px;
        text-align: left;
        font-size: 0.95em;
      }
      #chat-pdf-root th { background-color: #ecf0f1; font-weight: bold; color: #2c3e50; }
      #chat-pdf-root code {
        background-color: #f4f4f4;
        padding: 2px 6px;
        border-radius: 3px;
        font-family: 'Courier New', monospace;
      }
      #chat-pdf-root pre {
        background-color: #f4f4f4;
        padding: 12px;
        border-radius: 5px;
        overflow-x: auto;
        font-family: 'Courier New', monospace;
        white-space: pre-wrap;
        word-break: break-word;
      }
      #chat-pdf-root img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 12px 0;
        border-radius: 8px;
      }
      #chat-pdf-root hr { border: 0; border-top: 1px solid #e0e0e0; margin: 20px 0; }
    </style>
    <div style="position:relative;height:44px;margin-bottom:20px;padding-bottom:16p;">
      <span style="position:absolute;top:8px;left:0;line-height:0;">${i}</span>
      <span style="position:absolute;top:-4px;left:36px;font-size:26px;font-weight:500;color:#333;line-height:1;">use.ai</span>
    </div>
    ${t?`<h1 style="margin-top:0">${I(t)}</h1>`:``}
    ${a}
    <div style="margin-top:40px;padding-top:12px;padding-bottom:24px;border-top:1px solid #e0e0e0;text-align:center;color:#aaa;font-size:10px;letter-spacing:0.02em;">Generated by use.ai</div>
  </div>`},R=e=>new Promise(t=>{let n=Array.from(e.querySelectorAll(`img`));if(n.length===0){t();return}let r=n.length,i=()=>{--r,r<=0&&t()};for(let e of n)e.complete?i():(e.addEventListener(`load`,i,{once:!0}),e.addEventListener(`error`,i,{once:!0}));setTimeout(t,1e4)}),z=()=>{let[t,n]=(0,F.useState)(!1),{showToast:r}=v(),a=c(`Chat`);return{isDownloading:t,downloadChatAsPdf:(0,F.useCallback)(async(o,s,c,l,u)=>{if(t)return;n(!0),g.track(_.FILE_DOWNLOAD_STARTED,{file_type:`pdf`,source:`chat_export`,message_id:u,chat_id:l,report_title:s,user_id:g.getAnalyticsProperty().user_id||null});let d,f=`prepare`;try{let[{marked:t},{renderToStaticMarkup:n},{sanitizeUntrustedHtml:r}]=await Promise.all([i(()=>import(`./marked.esm-BIum_moM.js`).then(e=>e.n),__vite__mapDeps([0,1])),i(()=>import(`./react-dom-server-woWt0y2j.js`).then(t=>e(t.t(),1)),__vite__mapDeps([2,1,3])),i(()=>import(`./sanitize-html.util-BCWuoeSx.js`).then(e=>e.n),__vite__mapDeps([4,1,5]))]),a=n((0,F.createElement)(O,{width:28,height:28}));d=document.createElement(`div`),d.style.position=`fixed`,d.style.left=`-10000px`,d.style.top=`0`,d.style.width=`800px`,d.innerHTML=L(o,s,t,r,a),document.body.appendChild(d),await R(d);let p=(await i(()=>import(`./html2pdf-64f5Xxph.js`).then(t=>e(t.default,1)),__vite__mapDeps([6,1]))).default;f=`render`,await p().from(d.firstElementChild).set({margin:[12,10,12,10],filename:c,image:{type:`jpeg`,quality:.95},html2canvas:{scale:2,useCORS:!0,logging:!1,backgroundColor:`#ffffff`},jsPDF:{unit:`mm`,format:`a4`,orientation:`portrait`},pagebreak:{mode:[`avoid-all`,`css`,`legacy`]}}).save(),g.track(_.FILE_DOWNLOAD_SUCCESS,{file_type:`pdf`,source:`chat_export`,message_id:u,chat_id:l,report_title:s,user_id:g.getAnalyticsProperty().user_id||null})}catch(e){console.error(`[chat-download] PDF export failed during ${f}:`,e),g.track(_.FILE_DOWNLOAD_FAILED,{file_type:`pdf`,source:`chat_export`,message_id:u,chat_id:l,report_title:s,user_id:g.getAnalyticsProperty().user_id||null,error_phase:f,error_message:e instanceof Error?e.message:`Unknown error`}),r({title:a(`pdf_export_failed`),description:a(f===`prepare`?`pdf_export_failed_start`:`pdf_export_failed_description`),variant:`error`})}finally{d?.parentNode&&d.parentNode.removeChild(d),n(!1)}},[t,r,a])}},B=()=>{let e=b(e=>e.currentChatId),t=b(e=>e.currentMessages),i=r(),a=i.chatId||i.id||e,s=t[t.length-1]?.id,d=s?`chat-export-${s}`:a?`chat-export-${a}`:void 0,{downloadChatAsPdf:x,isDownloading:S}=z(),C=b(e=>e.isImageCreationHeroVisible),w=b(e=>e.isBackgroundRemovalHeroVisible),T=n(),{data:E}=u(),{showToast:D}=v(),O=c(`Chat`),k=o(),j=E?.user?.id,M=!!(j&&E?.user?.type!==`guest`),N=!!T?.includes(`/image-enhancer`),F=C||w||N||!!a&&p(a)||!!a&&m(a)||!!a&&h(a);return{chatId:a,shouldShow:M&&!!a&&t.length>0&&!F,isDisabled:!1,handleDownloadPdf:async()=>{if(!a||!d)return;if(t.length===0){D({title:O(`toast_title_no_content_to_download`),description:O(`toast_description_no_content_to_download`),variant:`error`});return}if(!t.filter(e=>e.role===`assistant`).some(e=>{let t=e.parts??[];return t.some(e=>e.type===`text`&&!!e.text?.trim())?!0:t.some(e=>e.type===`tool-deepResearch`&&e.state===`output-available`&&(e.output?.content||e.output?.answer)||e.type===`tool-image-google`||e.type===`tool-background-removal`)})){D({title:O(`toast_title_no_content_to_download`),description:O(`toast_description_no_content_to_download`),variant:`error`});return}let e=A(t,{embedImages:!0,userLabel:O(`chat_export_user_label`),assistantLabel:O(`chat_export_assistant_label`),getImageBytes:(e,t)=>a?y(a,e,t):void 0});if(!e.trim()){D({title:O(`toast_title_no_content_to_download`),description:O(`toast_description_no_content_to_download`),variant:`error`});return}let n=await P(e),r=t[t.length-1]?.id,i=r?`chat-export-${r}`:`chat-export-${a}`;g.track(_.PDF_DOWNLOAD_CLICKED,{message_id:i,chat_id:a,user_id:g.getAnalyticsProperty().user_id||null,source:`chat_export`});let o=k.getQueryData([f.CHAT_HISTORY_QUERY,j])?.pages?.flatMap(e=>e.chats||[]).find(e=>e.id===a)?.title?.trim()??``;o||=k.getQueryData([l.PROJECTS_QUERY,j])?.projects?.flatMap(e=>e.chats||[]).find(e=>e.id===a)?.title?.trim()??``;let s=o||O(`pdf_default_title`),c=`${(e=>e.replace(/[/\\:*?"<>|]+/g,`_`).replace(/\s+/g,` `).trim().slice(0,100))(s)||`chat`}.pdf`;await x(n,s,c,a,i)},isDownloading:S}};export{j as n,k as r,B as t};