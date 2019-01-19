export function translate(parentNode, htmlcontent) {
  parentNode.innerHTML = htmlcontent.content;
  const domain = htmlcontent.domain;
  const lastRequested = htmlcontent.lastRequested;
  console.log(htmlcontent);

  const anchor_array = parentNode.querySelectorAll('a');
  const img_array = parentNode.querySelectorAll('img');
  const link_array = parentNode.querySelectorAll('link');
  const script_array = parentNode.querySelectorAll('script');
  // console.log(script_array);
  script_array.forEach(script => {
    if (script.attributes.src) {
      let src = script.attributes.src.nodeValue;
      if (src.startsWith('http')) {
        script.attributes.src.nodeValue = '/proxy/' + src;
      } else if (src.startsWith('/')) {
        script.attributes.src.nodeValue = '/proxy/' + lastRequested + src;
      } else {
        if (src.startsWith('./')) {
          src = src.replace('.', '');
        }
        script.attributes.src.nodeValue = '/proxy/' + domain + src;
      }
    }
  });

  link_array.forEach(link => {
    let href = link.attributes.href.nodeValue;
    if (href.startsWith('http')) {
      link.attributes.href.nodeValue = '/proxy/' + href;
    } else if (href.startsWith('/')) {
      link.attributes.href.nodeValue = '/proxy/' + lastRequested + href;
    } else {
      if (href.startsWith('./')) {
        href = href.replace('.', '');
      }
      link.attributes.href.nodeValue = '/proxy/' + domain + href;
    }
  });

  img_array.forEach(img => {

    let src = img.attributes.src.nodeValue;
    if (src.startsWith('http')) {
      img.attributes.src.nodeValue = '/proxy/' + src;
    } else if (src.startsWith('/')) {
      img.attributes.src.nodeValue = '/proxy/' + lastRequested + src;
    } else {
      if (src.startsWith('./')) {
        src = src.replace('.', '');
      }
      img.attributes.src.nodeValue = '/proxy/' + domain + src;
    }
  });

  anchor_array.forEach(a => {

    if (a.href.startsWith('http')) {
      a.href = '/proxy/' + a.href;
    } else if (a.href.startsWith('/')) {
      a.href = '/proxy/' + lastRequested + a.href;
    } else {

      a.href = '/proxy/' + domain + a.href;
    }
    a.onclick = (e) => {
      e.preventDefault();
      console.log(e);

    };
  });

}
