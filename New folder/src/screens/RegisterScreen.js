import { useState } from "react";
import { View, Text, ScrollView, Pressable, Alert, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { validateForm, hasError } from "../utils/validate";
import Field from "../components/Field";
import { styles } from "../styles/registerStyles";


const EMPTY_FORM = {
  name: '',
  surname: '',
  studentID: '',
  username: '',
  password: '',
  confirm: '',
};

const RegisterScreen = () => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setError] = useState({});
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');

  function setField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setError((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

 const handleSubmit = async () => {
    setSuccess('')
    const found = validateForm(form)
    if (hasError(found)) {
      setError(found)
      return
    }

    console.log('ข้อมูลถูกต้อง พร้อมบันทึก', form)
  }
  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps='handled'
      >
        <Text style={styles.intro}>กรอกข้อมูลให้ครบทุกช่อง</Text>

        <View style={styles.row}>
          <Field 
            style={styles.half} 
            label="ชื่อ" 
            placeholder="สมชาย" 
            value={form.name} 
            onChangeText={(v) => setField('name', v)} 
            error={errors.name}
          />
          <Field 
            style={styles.half} 
            label="นามสกุล" 
            placeholder="ใจดี" 
            value={form.surname} 
            // แก้ไขจุดที่ 3: แก้ 'surnme' เป็น 'surname'
            onChangeText={(v) => setField('surname', v)}
            error={errors.surname}
          />
        </View>

        <Field 
          label="รหัสนิสิต" 
          placeholder="6721061234" 
          value={form.studentID} 
          onChangeText={(v) => setField('studentID', v)}
          error={errors.studentID} 
          maxLength={10} 
          // แก้ไขจุดที่ 4: แก้ 'n+umber-pad' เป็น 'number-pad'
          keyboardType="number-pad" 
        />

        <Field 
          label="ชื่อผู้ใช้งาน" 
          placeholder="Somchai_j" 
          value={form.username} 
          onChangeText={(v) => setField('username', v)}
          error={errors.username} 
          hint="ใช้สำหรับเข้าสู่ระบบ ห้ามใช้ซ้ำกับผู้อื่น" 
          autoCapitalize="none" 
          maxLength={20} 
        />

        <Field 
          label="รหัสผ่าน" 
          placeholder="อย่างน้อย 8 ตัว" 
          secureTextEntry 
          value={form.password} 
          onChangeText={(v) => setField('password', v)}
          error={errors.password} 
          hint="อย่างน้อย 8 ตัว ต้องมีทั้งตัวเลขและตัวอักษร" 
        />

        <Field 
          label="ยืนยันรหัสผ่าน" 
          placeholder="พิมพ์รหัสผ่านอีกครั้ง" 
          secureTextEntry 
          autoCapitalize="none" 
          value={form.confirm} 
          // แก้ไขจุดที่ 5: เปลี่ยนจาก 'password' เป็น 'confirm'
          onChangeText={(v) => setField('confirm', v)}
          error={errors.confirm} 
          hint="อย่างน้อย 8 ตัว ต้องมีทั้งตัวเลขและตัวอักษร" 
        />

        <Pressable 
          style={[styles.submit, saving && styles.submitDisabled]} 
          onPress={handleSubmit}
          disabled = {saving}
        >
          <Text style={styles.submitText}>
            {saving ? 'กำลังบันทึก' : "ลงทะเบียน"}
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// แก้ไขจุดที่ 6: เติม semicolon ปิดท้าย
export default RegisterScreen;