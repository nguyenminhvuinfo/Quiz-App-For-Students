import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import { supabase } from '../supabaseClient';  // Import Supabase client

function Content() {
  const [exams, setExams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExams = async () => {
      const { data, error } = await supabase
        .from('exam')  // Specify schema explicitly
        .select('*');

      if (error) {
        console.error("Error fetching data:", error);
        setError(`Lỗi khi lấy dữ liệu từ Supabase: ${error.message}`);
      } else if (data.length === 0) {
        setError('Không có bài kiểm tra nào.');
      } else {
        console.log("Dữ liệu nhận được từ Supabase:", data);  // In ra dữ liệu nhận được để kiểm tra
        // Cập nhật thời gian mặc định cho mỗi bài kiểm tra
        const updatedData = data.map((exam) => ({
          ...exam,
          startTime: "01/01/2024",
          endTime: "31/12/2025",
          scorePerQuestion: exam.quanity > 0 ? (10 / exam.quanity).toFixed(2) : 0,
        }));
        setExams(updatedData);
      }
    };

    fetchExams();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen px-12 py-8">
      <h1 className="text-3xl font-bold text-center my-4">Danh sách Bài Kiểm Tra</h1>
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {exams.map((exam) => (
            <Link to={`/exam/${exam.exam_id}`} key={exam.exam_id}>
              <div
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:transition duration-300 w-auto mx-auto h-80"
              >
                <h2 className="text-xl font-bold text-blue-600 mb-2 leading-tight">{exam._name}</h2>
                <p><span className="font-medium">Loại:</span> {exam._type}</p>
                <p><span className="font-medium">Môn:</span> Tin học 8</p>
                <p><span className="font-medium">Bắt đầu:</span> {exam.startTime}</p>
                <p><span className="font-medium">Kết thúc:</span> {exam.endTime}</p>
                <p><span className="font-medium">Thời gian:</span> {exam.time_test} phút</p>
                <p><span className="font-medium">Số câu:</span> {exam.quanity}</p>
                <p><span className="font-medium">Số điểm cho mỗi câu:</span> {exam.scorePerQuestion}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function ListExam() {
  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default ListExam;
