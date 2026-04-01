export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Hành tinh nào lớn nhất trong hệ mặt trời?",
    options: ["Sao Thổ", "Sao Mộc", "Sao Hải Vương", "Sao Thiên Vương"],
    correct: 1
  },
  {
    id: 2,
    question: "Hành tinh nào gần Mặt Trời nhất?",
    options: ["Sao Thủy", "Sao Kim", "Sao Hỏa", "Trái Đất"],
    correct: 0
  },
  {
    id: 3,
    question: "Hành tinh nào được gọi là 'Hành tinh đỏ'?",
    options: ["Sao Thủy", "Sao Hỏa", "Sao Kim", "Sao Mộc"],
    correct: 1
  },
  {
    id: 4,
    question: "Hành tinh nào có nhiều vệ tinh nhất?",
    options: ["Sao Mộc", "Sao Thổ", "Sao Hải Vương", "Sao Thiên Vương"],
    correct: 1
  },
  {
    id: 5,
    question: "Hành tinh nào quay ngược chiều so với các hành tinh khác?",
    options: ["Sao Kim", "Sao Thủy", "Sao Hải Vương", "Sao Thiên Vương"],
    correct: 0
  },
  {
    id: 6,
    question: "Hành tinh nào lạnh nhất trong hệ mặt trời?",
    options: ["Sao Thủy", "Sao Hải Vương", "Sao Thiên Vương", "Sao Thổ"],
    correct: 1
  },
  {
    id: 7,
    question: "Hành tinh nào có vành đai đẹp nhất?",
    options: ["Sao Mộc", "Sao Thổ", "Sao Hải Vương", "Sao Thiên Vương"],
    correct: 1
  },
  {
    id: 8,
    question: "Trái Đất cách Mặt Trời bao nhiêu triệu km?",
    options: ["149.6 triệu km", "227.9 triệu km", "108.2 triệu km", "57.9 triệu km"],
    correct: 0
  },
  {
    id: 9,
    question: "Hành tinh nào được phát hiện bằng tính toán toán học trước khi quan sát trực tiếp?",
    options: ["Sao Hải Vương", "Sao Thiên Vương", "Sao Thổ", "Sao Mộc"],
    correct: 0
  },
  {
    id: 10,
    question: "Mặt Trời chiếm bao nhiêu phần trăm khối lượng hệ mặt trời?",
    options: ["99.86%", "95%", "90%", "85%"],
    correct: 0
  }
];
