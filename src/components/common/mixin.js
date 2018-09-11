import { getStyle } from '../../config/mUtils'
import { imgBaseUrl, localapi, proapi } from '../../config/env'

export const loadMore = {
  directives: {
    'load-more': {
      bind: (el, binding) => {
      	function get_scrollTop_of_body() {
          var scrollTop;
          if (typeof window.pageYOffset != 'undefined') { //pageYOffset指的是滚动条顶部到网页顶部的距离
            scrollTop = window.pageYOffset;
          } else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {
            scrollTop = document.documentElement.scrollTop;
          } else if (typeof document.body != 'undefined') {
            scrollTop = document.body.scrollTop;
          }
          return scrollTop;
        }
        let windowHeight = window.screen.height;
        let height;
        let setTop;
        let paddingBottom;
        let marginBottom;
        let requestFram;
        let oldScrollTop;
        let scrollEl;
        let heightEl;
        let scrollType = el.attributes.type && el.attributes.type.value;
        let scrollReduce = 2;
        if (scrollType == 2) {
          scrollEl = el;
          heightEl = el.children[0];
        } else {
          scrollEl = document.body;
          heightEl = el;
        }

        el.addEventListener('touchstart', () => {
          height = heightEl.clientHeight;
          if (scrollType == 2) {
            height = height
          }
          setTop = el.offsetTop;
          paddingBottom = getStyle(el, 'paddingBottom');
          marginBottom = getStyle(el, 'marginBottom');
        }, false)

        el.addEventListener('touchmove', () => {
          loadMore();
        }, false)

        el.addEventListener('touchend', () => {
          oldScrollTop = get_scrollTop_of_body();
          moveEnd();
        }, false)

        const moveEnd = () => {
          requestFram = requestAnimationFrame(() => {
            if (get_scrollTop_of_body() != oldScrollTop) {
              oldScrollTop = get_scrollTop_of_body();
              moveEnd()
            } else {
              cancelAnimationFrame(requestFram);
              height = heightEl.clientHeight;
              loadMore();
            }
          })
        }

        

        const loadMore = () => {
          if (get_scrollTop_of_body() + windowHeight >= height + setTop + paddingBottom + marginBottom - scrollReduce) {
            binding.value();
          }
        }
      }
    }
  }
};

export const getImgPath = {
  methods: {
    //传递过来的图片地址需要处理后才能正常使用
    getImgPath(path) {
      let suffix;
      if (!path) {
        return 'http://test.fe.ptdev.cn/elm/elmlogo.jpeg'
      }
      if (path.indexOf('jpeg') !== -1) {
        suffix = '.jpeg'
      } else {
        suffix = '.png'
      }
      let url = '/' + path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + suffix;
      return 'https://fuss10.elemecdn.com' + url
    },
  }

}