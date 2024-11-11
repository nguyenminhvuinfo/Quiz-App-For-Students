import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Header({ timeLeft, questionsAnswered, handleSubmit }) {
  return (
    <div className="fixed top-0 left-0 pl-8 pr-6 w-full bg-blue-950 text-white py-4 z-50 shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <span className="font-semibold">Thời gian còn lại:</span> {timeLeft}
        </div>
        <div>
          <span className="font-semibold">Số câu đã làm:</span> {questionsAnswered}
        </div>
        <button
          onClick={handleSubmit}
          className="bg-white text-black px-4 py-2 rounded hover:bg-blue-300"
        >
          Nộp bài
        </button>
      </div>
    </div>
  );
}


function Content({ questions, onAnswerSelect, answers }) {
  return (
    <div className="p-6">
      {questions.map((question, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:transition duration-300 max-w-2xl mx-auto mb-6"
        >
          <h2 className="text-xl font-semibold mb-4">{question.text}</h2>
          {question.options.map((option, idx) => (
            <label key={idx} className="block mb-2">
              <input
                type="radio"
                name={`question-${index}`}
                value={option}
                onChange={() => onAnswerSelect(index, option)}
                checked={answers[index] === option}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      ))}
    </div>
  );
}


function Exam() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(60 * 60); // Thời gian bắt đầu 60 phút (3600 giây)
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [answers, setAnswers] = useState({});
  const questions = [
    {
      text: "Câu hỏi 1: Đây là nội dung câu hỏi thứ nhất?",
      options: ["A. Đáp án 1", "B. Đáp án 2", "C. Đáp án 3", "D. Đáp án 4"],
    },
    {
      text: "Câu hỏi 2: Đây là nội dung câu hỏi thứ hai?",
      options: ["A. Đáp án A", "B. Đáp án B", "C. Đáp án C", "D. Đáp án D"],
    },
    {
      text: "Câu hỏi 3: Câu hỏi này thuộc chủ đề nào?",
      options: ["A. Chủ đề 1", "B. Chủ đề 2", "C. Chủ đề 3", "D. Chủ đề 4"],
    },
    {
      text: "Câu hỏi 4: Bạn có thích học lập trình không?",
      options: ["A. Rất thích", "B. Thích vừa phải", "C. Không thích", "D. Không quan tâm"],
    },
    {
      text: "Câu hỏi 5: Môn học yêu thích của bạn là gì?",
      options: ["A. Toán", "B. Lý", "C. Hóa", "D. Văn"],
    },
    {
      text: "Câu hỏi 6: Bạn đang học năm thứ mấy?",
      options: ["A. Năm 1", "B. Năm 2", "C. Năm 3", "D. Năm 4"],
    },
    {
      text: "Câu hỏi 7: Bạn có thể làm được các bài toán tính toán cơ bản không?",
      options: ["A. Rất tốt", "B. Tốt", "C. Trung bình", "D. Kém"],
    },
    {
      text: "Câu hỏi 8: Bạn muốn học lập trình bằng ngôn ngữ nào?",
      options: ["A. Java", "B. C++", "C. Python", "D. JavaScript"],
    },
    {
      text: "Câu hỏi 9: Bạn đã bao giờ tham gia một dự án phần mềm chưa?",
      options: ["A. Có", "B. Chưa", "C. Đang tham gia", "D. Sắp tham gia"],
    },
    {
      text: "Câu hỏi 10: Bạn nghĩ về vai trò của công nghệ trong tương lai như thế nào?",
      options: ["A. Rất quan trọng", "B. Quan trọng", "C. Không quan trọng", "D. Không biết"],
    }
  ];
  

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)); // Giảm thời gian mỗi giây
    }, 1000); // Cập nhật mỗi giây

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionIndex, answer) => {
    setAnswers({ ...answers, [questionIndex]: answer });
    setQuestionsAnswered(Object.keys(answers).length + 1);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
  };

  const confirmSubmit = () => {
    alert("Bạn đã nộp bài thành công!");
    setIsSubmitting(false);
    navigate('/'); // Quay về trang chủ sau khi nộp bài thành công
  };

  const cancelSubmit = () => {
    setIsSubmitting(false);
  };

  return (
    <div>
      <Header
        timeLeft={formatTime(timeLeft)}
        questionsAnswered={questionsAnswered}
        handleSubmit={handleSubmit}
      />
      <Content questions={questions} onAnswerSelect={handleAnswerSelect} answers={answers} />
      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
          <div className="bg-white p-8 rounded shadow-lg text-center">
            <p className="mb-4">Bạn có chắc chắn muốn nộp bài?</p>
            <button
              onClick={confirmSubmit}
              className="bg-green-500 px-4 py-2 rounded text-white hover:bg-green-600 mr-2"
            >
              Xác nhận
            </button>
            <button
              onClick={cancelSubmit}
              className="bg-gray-500 px-4 py-2 rounded text-white hover:bg-gray-600"
            >
              Hủy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Exam;
