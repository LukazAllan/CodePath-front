//import { QuestionType } from './model/question_type.js';

export const QuestionType = {
  MULTIPLE_CHOICE: 'mc',
  TRUE_FALSE: 'tf',
  SHORT_TEXT: 'st',
  MATCHING: 'match'
};

export const LESSON_QUESTIONS = [
  {
    type: QuestionType.MULTIPLE_CHOICE,
    label: 'Escolha a alternativa correta',
    prompt: 'O que é TypeScript?',
    code: null,
    options: [
      'Uma linguagem completamente diferente de JavaScript',
      'Um superset tipado de JavaScript que compila para JS',
      'Uma biblioteca para manipulação do DOM',
      'Um framework para criação de APIs REST'
    ],
    correct: 1
  },
  {
    type: QuestionType.TRUE_FALSE,
    label: 'Verdadeiro ou Falso?',
    prompt: 'TypeScript permite definir tipos para variáveis, parâmetros e retorno de funções.',
    code: null,
    correct: true
  },
  {
    type: QuestionType.MULTIPLE_CHOICE,
    label: 'Leia o código e responda',
    prompt: 'Qual será o erro de tipagem no código abaixo?',
    code: `<span class="kw">let</span> nome: <span class="ty">string</span> = <span class="str">\"Allan\"</span>;
nome = <span class="num">42</span>; <span class="cmt">// ← aqui</span>`,
    options: [
      'Não há erro — TypeScript aceita qualquer valor',
      'Erro: não é possível reatribuir uma variável',
      'Erro: número não pode ser atribuído a uma variável do tipo string',
      'Erro: falta ponto-e-vírgula'
    ],
    correct: 2
  },
  {
    type: QuestionType.SHORT_TEXT,
    label: 'Complete com a palavra certa',
    prompt: 'Em TypeScript, a palavra-chave usada para definir um tipo personalizado é ____.',
    code: null,
    hint: 'Dica: não é "interface". É uma só palavra.',
    correct: 'type',
    acceptedAnswers: ['type']
  },
  {
    type: QuestionType.MATCHING,
    label: 'Associe os tipos TypeScript às suas descrições',
    prompt: 'Arraste cada tipo para sua descrição correta.',
    pairs: [
      { left: 'string', right: 'Texto e caracteres' },
      { left: 'number', right: 'Valores numéricos' },
      { left: 'boolean', right: 'Verdadeiro ou falso' },
      { left: 'any', right: 'Desativa a tipagem' }
    ]
  }
];

export function getLessonQuestion(index) {
  return LESSON_QUESTIONS[index];
}

export function getQuestionCount() {
  return LESSON_QUESTIONS.length;
}

export function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function formatElapsedTime(milliseconds) {
  const seconds = Math.round(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return `${minutes > 0 ? `${minutes}m ` : ''}${remaining}s`;
}

export function computeResult(correctCount, totalQuestions) {
  const xp = 10 * correctCount;
  const accuracy = totalQuestions ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const stars = accuracy >= 90 ? 3 : accuracy >= 60 ? 2 : 1;
  return { xp, accuracy, stars };
}
