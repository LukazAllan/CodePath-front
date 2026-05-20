import { shuffle } from './service.js';
import { QuestionType } from './model/question_type.js';

export function buildQuestionHTML(question) {
  const codeBlock = question.code ? `<pre class="q-code">${question.code}</pre>` : '';
  let inner = '';

  if (question.type === QuestionType.MULTIPLE_CHOICE) {
    const optionsHtml = question.options.map((option, index) => `
      <div class="mc-option" data-index="${index}">
        <div class="mc-option-key">${'ABCD'[index]}</div>
        ${option}
      </div>
    `).join('');
    inner = `<div class="mc-options">${optionsHtml}</div>`;
  } else if (question.type === QuestionType.TRUE_FALSE) {
    inner = `<div class="tf-options">
      <div class="tf-option" data-val="true"><div class="tf-option-emoji">✅</div>Verdadeiro</div>
      <div class="tf-option" data-val="false"><div class="tf-option-emoji">❌</div>Falso</div>
    </div>`;
  } else if (question.type === QuestionType.SHORT_TEXT) {
    inner = `<div class="st-input-wrap">
      <input class="st-input" type="text" placeholder="Digite sua resposta…" autocomplete="off" spellcheck="false">
      ${question.hint ? `<div class="st-hint">${question.hint}</div>` : ''}
    </div>`;
  } else if (question.type === QuestionType.MATCHING) {
    const leftHtml = question.pairs.map((pair, index) => `
      <div class="matching-item" data-side="left" data-index="${index}">${pair.left}</div>
    `).join('');

    const rightShuffled = shuffle(question.pairs.map((pair, index) => ({ text: pair.right, index })));
    const rightHtml = rightShuffled.map(item => `
      <div class="matching-item" data-side="right" data-index="${item.index}">${item.text}</div>
    `).join('');

    inner = `<div class="matching-area">
      <div class="matching-cols">
        <div>
          <div class="matching-col-label">Tipo</div>
          <div class="matching-items" id="matchLeft">${leftHtml}</div>
        </div>
        <div>
          <div class="matching-col-label">Descrição</div>
          <div class="matching-items" id="matchRight">${rightHtml}</div>
        </div>
      </div>
      <div class="matching-pairs" id="matchPairs"></div>
    </div>`;
  }

  return `
    <div class="q-label">${question.label}</div>
    <div class="q-prompt">${question.prompt}</div>
    ${codeBlock}
    ${inner}
  `;
}
