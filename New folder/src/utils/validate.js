export function validateForm({ name, surname, studentID, username, password, confirm }) {
    const errors = {};

    // 1. ตรวจสอบ ชื่อ-นามสกุล
    if (name.trim() === '') errors.name = 'กรุณากรอกชื่อ';
    if (surname.trim() === '') errors.surname = 'กรุณากรอกนามสกุล';

    // 2. ตรวจสอบรหัสนิสิต (เปลี่ยน S เป็น $ เพื่อล็อกให้เป็นตัวเลข 10 หลักพอดี)
    if (!/^\d{10}$/.test(studentID.trim())) {
        errors.studentID = 'รหัสนิสิตต้องเป็นตัวเลข 10 หลัก';
    }

    // 3. ตรวจสอบชื่อผู้ใช้
    if (!/^[a-zA-Z0-9_]{4,20}$/.test(username.trim())) {
        errors.username = 'ชื่อผู้ใช้ยาว 4-20 ตัว ใช้ได้เฉพาะ a-z, A-Z, 0-9 และ _';
    }

    // 4. ตรวจสอบรหัสผ่าน (ต้องยาว มากกว่าหรือเท่ากับ 8 และเป็นตัวเลขล้วน)
    if (password.length < 8) {
        errors.password = 'รหัสผ่านต้องยาวอย่างน้อย 8 ตัวอักษร';
    } else if (!/^\d+$/.test(password)) {
        errors.password = 'รหัสผ่านต้องเป็นตัวเลขเท่านั้น';
    }

    // 5. ตรวจสอบการยืนยันรหัสผ่าน 
    if (!confirm) {
        errors.confirm = 'กรุณายืนยันรหัสผ่าน';
    } else if (password !== confirm) {
        errors.confirm = 'รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน';
    }

    return errors;
}

export function hasError(errors) {
    return Object.keys(errors).length > 0;
}