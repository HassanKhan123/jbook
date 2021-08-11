import React, { useRef, useEffect } from 'react';

import './preview.css';

interface PreviewProps {
  code: string;
}

const html = `
<html>
<head>
</head>
<body>
 <div id="root"></div>
 <script>
   window.addEventListener('message',(even) => {
     try{
       eval(event.data)
     }catch(err){
       const root = document.querySelector('#root')
       root.innerHTML='<div style="color:red;"><h4>Runtime Error</h4>'+err+'</div>'
       console.error(err)

     }
   },false)
 </script>
</body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    iframe.current.contentWindow.postMessage(code, '*');
  }, [code]);

  return (
    <div className='preview-wrapper'>
      <iframe
        srcDoc={html}
        sandbox='allow-scripts'
        ref={iframe}
        title='preview'
      />
    </div>
  );
};

export default Preview;
