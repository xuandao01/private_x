let resources =  {
    vi: {
        errorMes: "Có lỗi xảy ra vui lòng liên hệ MISA!",
        companyName: {
            0: "CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ - QUÝ PHÚC"
        },
        username: {
            0: "Trịnh Xuân Đào"
        },
        menuItem:{
            0: "Tổng quan",
            1: "Tiền mặt",
            2: "Tiền gửi",
            3: "Mua hàng",
            4: "Bán hàng",
            5: "Quản lý đơn",
            6: "Công cụ",
            7: "Tài sản cố định",
            8: "Báo cáo",
            9: "Giá thành",
            10: "Thuế",
            11: "Tổng hợp",
            12: "Ngân sách",
            13: "Danh mục",

        },
        employeeDetail:{
            createTitle: "Thông tin nhân viên",
            updateTitle: "Sửa nhân viên",
            customer: "Là khách hàng",
            supplier: "Là nhà cung cấp",
            code: "Mã",
            fullName: "Tên",
            department: "Phòng ban",
            position: "Chức danh",
            dob: "Ngày sinh",
            gender: "Giới tính",
            identity: "Số CMND",
            identityDetail: "Số chứng minh nhân dân",
            dateOfIssue: "Ngày cấp",
            issuedBy: "Nơi cấp",
            address: "Địa chỉ",
            phoneNumber: "ĐT di động",
            phoneNumberDetail: "Điện thoại di động",
            landingPhone: "ĐT cố định",
            landingPhoneDetail: "Điện thoại cố định",
            bankAccount: "Số tài khoản ngân hàng",
            bankName: "Tên ngân hàng",
            bankBranch: "Chi nhánh tk ngân hàng",
            bankBranchDetail: "Chi nhánh tài khoản ngân hàng"
            
        },
        dialogMessage:{
            confirmDelete: "Bạn có muốn xóa nhân viên ",
            confirmMultipleDelete: "Bạn có thực sự muốn xóa các nhân viên đã chọn không ?",
            confirmChange: "Dữ liệu đã thay đổi, bạn có muốn cất không ?",
            developing: "Tính năng đang được phát triển!"
        },
        btnAction:{
            cancel: "Hủy",
            store: "Cất",
            storeSave: "Cất và thêm",
            confirm: "Đồng ý",
            yes: "Có",
            close: "Đóng",
            no: "Không"
        },
        actionMultiple: {
            title: 'Thực hiện hàng loạt',
            deleteAction: 'Xóa',
        },
        contextMenuAction:{
            duplicate: "Nhân bản",
            delete: "Xóa",
            unuse: "Ngưng sử dụng"
        },
        employeeList: {
            title: "Nhân viên",
            createButton: "Thêm nhân viên",
            EmployeeCodeTitle: "Mã nhân viên",
            EmployeeFullNameTitle: "Tên nhân viên",
        },
        employeeDetailError:{
            duplicateCode: "Mã nhân viên đã tồn tại trong hệ thống",
            codeInvalidLength: "Mã nhân viên không được phép vượt quá 20 ký tự",
            nameInvalidLength: "Tên nhân viên không được phép vượt quá 100 ký tự",
            dobInvalidData: "Ngày sinh không hợp lệ",
            issueDateInvalid: "Ngày cấp không hợp lệ",
        },
        employeeDetailBtn:{
            save: "Cất",
            saveTooltip: "Cất (Ctrl + S)",
            saveAndAdd: "Cất và thêm",
            saveAndAddTooltip: "Cất và thêm (Ctrl + Shift + S)",
            close: "Hủy",
            closeTooltip: "Hủy (ESC)"
        },
        common:{
            developing: "Tính năng đang được phát triển"
        },
        cash:{
            progress:{
                title: "NGHIỆP VỤ TIỀN MẶT"
            },

            main:{
                content: ['Thu tiền', 'Chi tiền', 'Kiểm kê quỹ'],
                menu: ['Khách hàng', 'Nhà cung cấp', 'Nhân viên', 'Tài khoản']
            },

            report:{
                title: "BÁO CÁO",
                main: ['Bảng kê số dư theo ngày', 'Dòng tiền', 'S03a1-DN: Sổ nhật ký thu tiền', 'Sổ kế toán chi tiết quỹ tiền mặt', 'S03a2-DN: Sổ nhật ký chi tiền'],
                footer: "Tất cả báo cáo",
            }
        },
        di:{
            
        }
    },

    en: {
        errorMes: "Oops, something went wrong contact MISA!"
    },

    endpoint: "https://localhost:44381/api/"
}

export default resources