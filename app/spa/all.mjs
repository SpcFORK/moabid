import moabID from './moabid/index.mjs';

if (location.href.includes('janeway.replit.dev/')) import('./moabid/test.mjs')

const NOOP = () => () => { };

class CenterCard {
  static vv = visualViewport

  static centerStyle = {
    position: 'absolute',
    top: `${this.vv.height / 2}px`,
    left: `${this.vv.width / 2}px`,
    transform: 'translate(-50%, -50%)',
  }

  static arrStr = (...arr) => arr.join('<br>')

  static relPos$ = (el, x, y) => el.style$({
    position: 'relative',
    top: `${y}px`,
    left: `${x}px`,
  })

  static copyToClipboard = async (str) => !!navigator?.clipboard?.writeText
    ? navigator.clipboard.writeText(str)
    : Promise.reject('The Clipboard API is not available.')

  static FlexHR() {
    return hr().style$({
      'margin-top': '1rem',
      'border-color': 'white',
      'border-width': '1px',
    })
  }

  static makeButton(text, clickCB = this.CLICKEVENT) {
    let btn = button()
      .text$(text)
      .class$('silk-b')
      .on$('click', clickCB)
      .on$('mouseenter', () => btn.style$({ color: 'yellow' }))
      .on$('mouseleave', () => btn.style$({ color: 'white' }))
      .on$('mousedown', () => btn.style$({ color: 'orange' }))
      .on$('mouseup', () => btn.style$({ color: 'white' }))
      .style$({
        border: 'none',
        outline: 'none',
        color: 'white',
        width: 'min-content',
        'font-size': '2rem',
        'text-align': 'center',
        'border-radius': '50%',
        'background-color': '#0002',
      })
    return btn;
  }

  static makeDummyButton = (value) => this.makeButton(value, NOOP())
    .att$('class', 'silk-r')

  static makeButtonSect(...args) {
    return span(...args).style$({
      display: 'flex',
      // 'flex-wrap': 'wrap',
      'justify-content': 'center',
      width: '100%',
    })
  }

  static Incrementor = class Incrementor {
    IncSize = 8;
    Limit = 0;
    DisplayName = 'Incrementor';

    /** @type {Promise<any>[]} */
    static Animations = [];
    async Animate() {
      await Promise.all(Incrementor.Animations);
      CenterCard.TitleText.html$(`Set ${this.DisplayName} Size to ${this.IncSize}`);

      let state = new Promise(r => setTimeout(r, 2000))
        .then(() => CenterCard.TitleText.html$('MoabID'))

      Incrementor.Animations.push(state)
    }

    Size = CenterCard.makeButton(this.IncSize, () => {
      let tempInput = '';
      while (!tempInput) tempInput = prompt('Enter a number to increment by:');
      this.IncSize = parseInt(tempInput) || this.IncSize;
      this.IncreaseSize(0);
      this.Animate();
    })

    IncreaseSize(v) {
      this.IncSize += v;
      if (this.IncSize < this.Limit) this.IncSize = this.Limit;
      this.Size.text$(this.IncSize)
      return this;
    }

    Adjust(limit) {
      this.Limit = limit;
      this.IncreaseSize(0);
      return this;
    }
  }

  static ButtonBarMaker = class ButtonBarMaker {
    jump = 1
    maxJump = 2
    symbols = ['<', '-', '+', '>']

    Inc = new CenterCard.Incrementor();

    MDIncSBut;
    DIncSBut;
    Size;
    IncSBut;
    MIncSBut;

    constructor(jump, maxJump, symb) {
      jump && (this.jump = jump);
      maxJump && (this.maxJump = maxJump);
      symb && (this.symbols = symb);

      this.Inc.Adjust(this.maxJump);

      let matrix = [
        ['MDIncSBut', -this.maxJump],
        ['DIncSBut', -this.jump],
        ['IncSBut', this.jump],
        ['MIncSBut', this.maxJump]
      ]

      matrix.forEach(([b, inc], i) => {
        this[b] = CenterCard.makeButton(this.symbols[i], () => this.Inc.IncreaseSize(inc))
      })
    }

    Size = this.Inc.Size

    prepare = () => [
      this.MDIncSBut,
      this.DIncSBut,
      this.Size,
      this.IncSBut,
      this.MIncSBut,
    ]
  }

  // ---

  static centeredView = div()
    .style$({
      ...this.centerStyle,
      height: '100%',
      display: 'flex',
      'flex-direction': 'column',
      'justify-content': 'center',
      'align-items': 'center',
    })

  static {
    // On Enter, Gen
    document.addEventListener('keydown', (e) => {
      const { key } = e;
      let click = (el) => el.get$().click();
      console.log(key);
      key === 'Enter' && click(this.GenButton);
      key === 'c' && click(this.CopyButton);
      key === 'ArrowLeft' && click(this.Bar1.DIncSBut);
      key === 'ArrowRight' && click(this.Bar1.IncSBut);
      key === 'ArrowUp' && click(this.Bar2.DIncSBut);
      key === 'ArrowDown' && click(this.Bar2.IncSBut);
    })
  }

  static Title = this.relPos$(div(), 0, 0)

  static TitleText = h1('MoabID').class$('silk-b').style$({
    'font-size': '2rem',
    'text-align': 'center',
  })

  static BarSpan = span().style$()

  static CopyableInput = div()
    .class$('silk-r')
    .att$('type', 'text')
    .att$('readonly', 'readonly')
    .text$(moabID.generateMoabID())
    .style$({
      border: 'none',
      outline: 'none',
      color: 'white',
      position: 'relative',
      display: 'inline-block',
      transform: 'translateY(-10px)',
      'font-size': '2rem',
      'text-align': 'center',
      'border-radius': '25%',
      'background-color': 'transparent',
      'overflow-wrap': 'break-word',
    })

  static dupeText = 'Dupe...?'

  static CLICKEVENT = () => {
    // CenterCard.CopyableInput.get$().select();
    // document.execCommand('copy');
    let res = CenterCard.CopyableInput
      .get$().innerHTML
      .split('\n')
      .filter((v) => v != this.dupeText)

    CenterCard.copyToClipboard(res).then(() => {
      CenterCard.TitleText.html$('Copied!');
      setTimeout(() => CenterCard.TitleText.html$('MoabID'), 2000);
    })
  }

  static ButtonSect1 = this.makeButtonSect();
  static ButtonSect2 = this.makeButtonSect();
  static ButtonSect3 = this.makeButtonSect();

  static CopyButton = this.makeButton('Copy')

  static Bar1 = new CenterCard.ButtonBarMaker(1, 1)
  static Bar2 = new CenterCard.ButtonBarMaker(1, 1, ['\\', '-', '+', '/'])

  static {
    this.Bar2.Inc.IncSize = 1;
    this.Bar2.Inc.IncreaseSize(0);

    this.Bar1.Inc.DisplayName = 'Length';
    this.Bar2.Inc.DisplayName = 'Lines';
  }

  static GenButton = this.makeButton('Generate', () => this.CopyableInput.html$(
    new Array(this.Bar2.Inc.IncSize)
      .fill(0)
      .map(() => moabID.generateMoabID(this.Bar1.Inc.IncSize))
      .map((v, i, a) => (a.indexOf(v) === i) ? v : this.dupeText)
      .sort((a, b) => a.localeCompare(b))
      .join('\n')
  ))

  static Foot = code(
    br(),
    `View the package on `,
    a('NPM!')
      .att$('href', 'https://www.npmjs.com/package/moabid')
      .att$('target', '_blank')
    ,
  
  ).style$({
    'font-size': '1.25rem',
    'text-align': 'center',
  })

  // ---

  static {
    this.Title.append$(this.TitleText);

    this.centeredView.appendChildren$(
      this.Title,
      this.BarSpan,
    );

    this.BarSpan.appendChildren$(
      this.CopyableInput,
      this.FlexHR().style$({
        width: '50%',
        'border-color': '#fff2',
      }),
      this.ButtonSect1,
      this.ButtonSect2,
      this.ButtonSect3,
    );

    this.ButtonSect1.appendChildren$(
      this.CopyButton,
      this.GenButton,

      // this.makeDummyButton(':'),
    );

    this.ButtonSect2.appendChildren$(...this.Bar1.prepare())
    this.ButtonSect3.appendChildren$(...this.Bar2.prepare())

    this.centeredView.appendChildren$(this.Foot)
  }

  static prepare() {
    return this.centeredView.get$();
  }
}

export default function all(Main) {
  return div(CenterCard.prepare())
}