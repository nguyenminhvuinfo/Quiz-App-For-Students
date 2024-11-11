import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';

function Content() {
  const exams = [
    { id: 1, name: "Bài kiểm tra Toán", column: "Giữa kỳ", startTime: "2024-11-11 09:00", endTime: "2024-11-11 10:00", duration: "60 phút", questionCount: 20 },
    { id: 2, name: "Bài kiểm tra Văn", column: "Cuối kỳ", startTime: "2024-11-12 14:00", endTime: "2024-11-12 15:30", duration: "90 phút", questionCount: 30 },
    { id: 3, name: "Bài kiểm tra Lý", column: "Giữa kỳ", startTime: "2024-11-13 09:00", endTime: "2024-11-13 10:00", duration: "60 phút", questionCount: 25 },
    { id: 4, name: "Bài kiểm tra Hóa", column: "Cuối kỳ", startTime: "2024-11-14 14:00", endTime: "2024-11-14 15:30", duration: "90 phút", questionCount: 30 },
  ];

  return (
    <div className="bg-gray-100 min-h-screen px-36">
      <h1 className="text-3xl font-bold text-center my-4">Danh sách Bài Kiểm Tra</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {exams.map((exam) => (
          <Link to="/exam" key={exam.id}>
            <div 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:transition duration-300 w-72 mx-auto h-72"
            >
              <h2 className="text-xl font-semibold text-blue-600 mb-2 leading-loose">{exam.name}</h2>
              <p><span className="font-medium">Loại:</span> {exam.column}</p>
              <p><span className="font-medium">Bắt đầu:</span> {exam.startTime}</p>
              <p><span className="font-medium">Kết thúc:</span> {exam.endTime}</p>
              <p><span className="font-medium">Thời gian:</span> {exam.duration}</p>
              <p><span className="font-medium">Số câu:</span> {exam.questionCount}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
function Course() {
  return (
    <div>
      <Header/>
      <Content />
      <Footer />
    </div>
  );
}
export default Course;
