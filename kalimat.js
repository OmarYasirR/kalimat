const leter = document.querySelector('.letters');
const imgCont = document.querySelector('.images');
const title = document.querySelector('.title');
const currntAnswer = document.querySelector('.check');
const submtBtn = document.querySelector('.submit');
const delt = document.querySelector('.delt');
const letters = [...leter.children];

const getImages = async () => {
  const respon = await fetch('./image.json');
  const data = await respon.json();
  return data;
};
let imeges = '';
getImages().then((data) => {
  let images = data;
  let qustionCount = images.length;
  let currntIndex = 0;

  function viewHandler() {
    let currntItem = images[currntIndex];
    title.innerHTML = `${currntItem.title} <span>- ${currntItem.id + 1}</span>`;
    let imege = currntItem.image;
    imgCont.innerHTML = '';
    for (const [key, value] of Object.entries(imege)) {
      imgCont.innerHTML += `
      <div data-image=${key} class="img-cont p-1 col-4 col-md-2 p-sm-3 position-relative">
      <img src=${value} class="img-fluid img-thumbnail" alt="...">
      </div>
      `;
    }
  }
  viewHandler();
  let items = ''
  let currntWord = [];
  letters.forEach((el) => {
    el.addEventListener('click', (e) => {
      let currntLetter = e.currentTarget.dataset.letter;
      currntWord.push(currntLetter);
      addToCrntAnsr(currntWord);
    });
  });

  submtBtn.addEventListener('click', () => {
    if (currntWord.join('')) {
      checkAnwser(currntWord.join(''));
    }
  });

  delt.addEventListener('click', () => {
    if (currntWord.length) {
      currntWord.pop();
      addToCrntAnsr(currntWord);
    }
  });

  //function to check answers
  function checkAnwser(answer) {
    // images data set attribute Array
    items = document.querySelectorAll('.img-cont');

    let imgDataAtr = [];
    items.forEach((itm) => {
      imgDataAtr.push(itm.dataset.image);
    });
    if (imgDataAtr.indexOf(answer) != -1) {
      items[imgDataAtr.indexOf(answer)].classList.add('correct');
      currntWord = [];
      addToCrntAnsr(currntWord);
      navgting();
    } else {
      currntAnswer.classList.add('worng');
      setTimeout(() => {
        currntAnswer.classList.remove('worng');
      }, 2000);
    }
  }
  function navgting() {
    let increce = [...items].every((el) => {
      return el.classList.contains('correct');
    });
    if (increce && currntIndex < qustionCount - 1) {
      currntIndex += 1;
      viewHandler();
    }
    if(currntIndex == qustionCount - 1){
      currntIndex = 0;
      viewHandler();
    }
  }
});

function addToCrntAnsr(answer) {
  let newArr = answer.map((el) => {
    if (el == '-') {
      return ' ';
    } else {
      return el;
    }
  });
  currntAnswer.innerHTML = newArr.join('');
}
