import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useId } from '../context/IdContext';
import { supabase } from '../supabaseClient';  // Import Supabase client

function Header({ timeLeft, questionsAnswered, totalQuestions, handleSubmit }) {
  return (
    <div className="fixed top-0 left-0 pl-8 pr-6 w-full bg-blue-950 text-white py-4 z-50 shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <span className="font-semibold">Thời gian còn lại:</span> {timeLeft}
        </div>
        <div>
          <span className="font-semibold">Số câu đã làm:</span> {questionsAnswered}/{totalQuestions}
        </div>
        <button
          onClick={handleSubmit}
          className="bg-white text-black px-4 py-2 rounded hover:bg-blue-300"
          disabled={questionsAnswered < totalQuestions}
        >
          Nộp bài
        </button>
      </div>
    </div>
  );
}

// Giao diện hiển thị câu hỏi trắc nghiệm và lựa chọn
function Content({ questions, onAnswerSelect, answers }) {
  return (
    <div className="p-6 mt-20">
      {questions.map((question, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:transition duration-300 max-w-2xl mx-auto mb-6">
          <h2 className="text-xl font-bold mb-4">Câu {index + 1}: {question.text}</h2>
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
  const [timeLeft, setTimeLeft] = useState(60 * 60);
  const [questions, setQuestions] = useState([]);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null); // State để lưu điểm số
  const { examId } = useParams();
  const { user } = useId();  // Lấy dữ liệu từ IdContext
  const [error, setError] = useState(null); // State to store error message

  useEffect(() => {
    async function getExamData() {
      try {
        const { data: examData, error: examError } = await supabase
          .from('exam')
          .select('time_test')
          .eq('exam_id', examId)
          .single();

        if (examError) {
          throw new Error(`Lỗi khi lấy dữ liệu từ Supabase: ${examError.message} (Mã lỗi: ${examError.code})`);
        }

        if (examData?.time_test) {
          setTimeLeft(examData.time_test * 60); // Giả định thời gian trả về là số phút
        }

        const { data: questionData, error: questionError } = await supabase
          .from('question')
          .select('*')
          .eq('exam_id', examId);

        if (questionError) {
          throw new Error(`Lỗi khi lấy dữ liệu từ Supabase: ${questionError.message} (Mã lỗi: ${questionError.code})`);
        }

        if (!questionData || questionData.length === 0) {
          console.warn("Không có dữ liệu câu hỏi cho kỳ thi này.");
          setQuestions([]); // Ensure questions state is set to an empty array
          return;
        }

        console.log("Dữ liệu câu hỏi từ Supabase:", questionData); // Log dữ liệu để kiểm tra

        const formattedQuestions = questionData.map(item => ({
          text: item.content,
          options: [
            `A. ${item.option_a}`,
            `B. ${item.option_b}`,
            `C. ${item.option_c}`,
            `D. ${item.option_d}`
          ],
          correctAnswer: item.correct_answer
        }));
        setQuestions(formattedQuestions);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ Supabase:", error);
        setError(error.message); // Set error message
        setQuestions([]); // Ensure questions state is set to an empty array in case of error
      }
    }

    getExamData();
  }, [examId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = seconds => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionIndex, answer) => {
    setAnswers({ ...answers, [questionIndex]: answer });
    setQuestionsAnswered(Object.keys({ ...answers, [questionIndex]: answer }).length);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
  };

  const confirmSubmit = async () => {
    // Tính toán điểm số
    const correctCount = questions.reduce((count, question, index) => {
      // Lấy chữ cái đại diện cho đáp án từ `answers`
      const selectedAnswer = answers[index]?.split('.')[0]; // Lấy phần đầu, ví dụ 'A' từ 'A. Đáp án 1'
  
      if (selectedAnswer === question.correctAnswer) {
        return count + 1;
      }
      return count;
    }, 0);
     
    setScore(correctCount); // Lưu điểm số
    setIsSubmitting(false);

    try {
      const { error } = await supabase
        .from('student_score')
        .insert([
          {
            account_id: user.id,
            exam_id: examId,
            total: correctCount,
          },
        ]);

      if (error) {
        throw new Error('Không thể gửi dữ liệu lên Supabase');
      }

      console.log('Kết quả từ Supabase:', { userId: user.id, examId, total: correctCount });

    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu lên Supabase:", error);
    }
  };

  const cancelSubmit = () => {
    setIsSubmitting(false);
  };

  return (
    <div>
      <Header
        timeLeft={formatTime(timeLeft)}
        questionsAnswered={questionsAnswered}
        totalQuestions={questions.length}
        handleSubmit={handleSubmit}
      />
      {error ? (
        <div className="p-6 mt-20 text-center">
          <p className="text-xl font-bold text-red-500">Lỗi: {error}</p>
        </div>
      ) : questions.length === 0 ? (
        <div className="p-6 mt-20 text-center">
          <p className="text-xl font-bold">Không có câu hỏi nào cho kỳ thi này.</p>
        </div>
      ) : (
        <Content questions={questions} onAnswerSelect={handleAnswerSelect} answers={answers} />
      )}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
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
      {score !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center overflow-auto">
          <div className="bg-white p-8 pt-24 rounded shadow-lg max-w-4xl mx-auto text-center overflow-y-auto">
            <p className="text-lg font-semibold mb-4">
              Bạn đã hoàn thành bài thi với số câu trả lời đúng: {score}/{questions.length}
            </p>
            <div className="text-left">
              {questions.map((question, index) => {
                const userAnswer = answers[index]?.split('.')[0]; // Lấy A, B, C, D
                const isCorrect = userAnswer === question.correctAnswer;
                return (
                  <div key={index} className="mb-6 p-4 border-b border-gray-300">
                    <p className="text-xl font-bold mb-2">
                      Câu {index + 1}: {question.text}
                    </p>
                    <div>
                      {question.options.map((option, idx) => {
                        const optionKey = option.split('.')[0]; // Lấy A, B, C, D
                        let textColor = 'text-gray-500'; // Màu mặc định

                        if (optionKey === userAnswer) {
                          textColor = isCorrect ? 'text-green-500' : 'text-red-500';
                        }

                        if (optionKey === question.correctAnswer && optionKey !== userAnswer) {
                          textColor = 'text-green-700'; // Hiển thị màu xanh đậm cho đáp án đúng
                        }

                        return (
                          <p key={idx} className={`mb-2 ${textColor}`}>
                            {option} {optionKey === userAnswer && '(Bạn đã chọn)'}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <p>Cảm ơn bạn đã tham gia!</p>

            <button
              className="mt-4 bg-blue-500 px-4 py-2 text-white rounded hover:bg-blue-600"
              onClick={() => navigate("/")}
            >
              Về trang chủ
            </button>
          </div>
          
        </div>
      )}
    </div>
  );
}

export default Exam;
