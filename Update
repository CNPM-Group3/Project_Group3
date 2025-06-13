from fastapi import FastAPI, HTTPException
from datetime import datetime

# --------------------------------------------------------
# Tên dự án: Ứng dụng đề tài quản lý khoa học cấp trường
# Tác giả: Nguyễn Đặng Xuân Hương
# Trường: Đại học Giao Thông Vận Tải
# Khoa: Khoa học dữ liệu
# Chức năng: API GET lấy thông tin chi tiết đề tài nghiên cứu theo ID
# --------------------------------------------------------

app = FastAPI()

mock_db = [
    {
        "id": 1,
        "title": "Nghiên cứu AI trong giáo dục",
        "description": "Nghiên cứu ứng dụng trí tuệ nhân tạo hỗ trợ giảng dạy",
        "objectives": "Phát triển hệ thống hỗ trợ học tập thông minh",
        "expectedOutcomes": "Ứng dụng demo hỗ trợ học tập",
        "requirements": "Kỹ năng lập trình Python, kiến thức AI",
        "availableFunding": 10000000,
        "isActive": True,
        "createdById": 1,
        "createdByName": "Nguyễn Đặng Xuân Hương",
        "createdAt": datetime.utcnow().isoformat(),
        "updatedAt": datetime.utcnow().isoformat()
    }
]

@app.get("/api/ResearchTopics/{id}")
def get_research_topic(id: int):
    for topic in mock_db:
        if topic["id"] == id:
            return topic
    raise HTTPException(status_code=404, detail="Không tìm thấy đề tài")
