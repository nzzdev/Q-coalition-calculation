import 'core-js/es6/object';

import rendererConfigDefaults from './rendererConfigDefaults';
import Opinion from './opinion';

import {loadCSS} from 'fg-loadcss';
import onloadCSS from './resources/onloadCSS';

import SizeObserver from './resources/SizeObserver';
var sizeObserver = new SizeObserver();

var stylesLoaded = false;

function wrapEmojisInSpan(text) {
  text = text.replace(
    /([\ud800-\udbff])([\udc00-\udfff])/g,
    '<span class="emoji">$&</span>');
  return text;
}

function getElementSize(rect) {
  let size = 'small';
  if (rect.width && rect.width > 480) {
    size = 'large';
  } else {
    size = 'small';
  }
  return size;
}

function getContextHtml(item) {
  let html = '';
  if (!item.options || !item.options.hideTitle) {
    html += `<h3 class="q-item__title">${wrapEmojisInSpan(item.title)}</h3>`;
  }
  html += '<div class="q-item-container"></div>';
  //html += '</div></div>';
  return html;
}

function displayWithContext(item, element) {
  let el = document.createElement('section');
  el.setAttribute('class','q-party-parole-item');                     // <-- replace this classname probably
  el.innerHTML = getContextHtml(item);
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  element.appendChild(el);

  return render(item, el.querySelector('.q-item-container'));
}

function displayWithoutContext(item, element) {
  element.setAttribute('class','q-party-parole-item');
  return render(item, element);
}

function render(item, element) {
  return new Promise((resolve, reject) => {
    new Opinion(element,item);
    resolve();
  });
}

export function display(item, element, rendererConfig, withoutContext = false) {
  return new Promise((resolve, reject) => {
    // console.log(item, element, rendererConfig);
    try {
      if (!element) throw 'Element is not defined';

      if (rendererConfig && typeof rendererConfig === 'object') {
        rendererConfig = Object.assign(rendererConfigDefaults, rendererConfig);
      } else {
        rendererConfig = rendererConfigDefaults;
      }

      let graphic;

      let rendererPromises = [];

      if (rendererConfig.loadStyles && stylesLoaded === false) {
        let themeUrl = rendererConfig.themeUrl || `${rendererConfig.rendererBaseUrl}themes/${rendererConfig.theme}`;
        let themeLoadCSS = loadCSS(`${themeUrl}/styles.css`);
        let themeLoadPromise = new Promise((resolve, reject) => {
          onloadCSS(themeLoadCSS, () => {
            resolve();
          });
        });


        // additional styles
        let sophieStylesLoad = loadCSS('https://service.sophie.nzz.ch/bundle/sophie-q@~0.1.1,sophie-font@0.1.0,sophie-color@~0.1.0[color+background],sophie-input@~0.1.0[range].css');
        let sophieStylesLoadPromise = new Promise((resolve, reject) => {
          onloadCSS(sophieStylesLoad, () => {
            resolve();
          });
        });

        Promise.all([themeLoadPromise, sophieStylesLoadPromise])
          .then(styles => {
            stylesLoaded = true;
          });

        rendererPromises.push(themeLoadPromise);
        rendererPromises.push(sophieStylesLoadPromise);
      }

      // use this if your rendering is depending on container size

      sizeObserver.onResize((rect) => {
        let drawSize = getElementSize(rect);

        try {
          if (withoutContext) {
            graphic = displayWithoutContext(item, element, drawSize);
          } else {
            graphic = displayWithContext(item, element, drawSize);
          }
        } catch (e) {
          reject(e);
        }

        resolve({
              graphic: graphic,
              promises: rendererPromises
            });

      }, element, true);

      // use this if container size doesn't influence your rendering
      // render(item,element)
      //   .then(() => {
      //     resolve({
      //         graphic: graphic,
      //         promises: rendererPromises
      //       });
      //   })
      //   .catch((e) => {
      //     reject(e);
      //   })

    } catch (e) {
      reject(e);
    }
  });
}
