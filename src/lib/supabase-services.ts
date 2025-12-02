import { supabase } from './supabase';
import type { Database } from './database.types';

type Student = Database['public']['Tables']['students']['Row'];
type StudentInsert = Database['public']['Tables']['students']['Insert'];
type StudentUpdate = Database['public']['Tables']['students']['Update'];

type Polo = Database['public']['Tables']['polos']['Row'];
type PoloInsert = Database['public']['Tables']['polos']['Insert'];
type PoloUpdate = Database['public']['Tables']['polos']['Update'];

type AdminUser = Database['public']['Tables']['admin_users']['Row'];
type AdminUserInsert = Database['public']['Tables']['admin_users']['Insert'];
type AdminUserUpdate = Database['public']['Tables']['admin_users']['Update'];

type StaffMember = Database['public']['Tables']['staff_members']['Row'];
type StaffMemberInsert = Database['public']['Tables']['staff_members']['Insert'];
type StaffMemberUpdate = Database['public']['Tables']['staff_members']['Update'];

type Enrollment = Database['public']['Tables']['enrollments']['Row'];
type EnrollmentInsert = Database['public']['Tables']['enrollments']['Insert'];
type EnrollmentUpdate = Database['public']['Tables']['enrollments']['Update'];

type Certificate = Database['public']['Tables']['certificates']['Row'];
type CertificateInsert = Database['public']['Tables']['certificates']['Insert'];
type CertificateUpdate = Database['public']['Tables']['certificates']['Update'];

type SystemSetting = Database['public']['Tables']['system_settings']['Row'];
type SystemSettingInsert = Database['public']['Tables']['system_settings']['Insert'];
type SystemSettingUpdate = Database['public']['Tables']['system_settings']['Update'];

// =====================================================
// STUDENTS SERVICE
// =====================================================
export const studentsService = {
  async getAll(): Promise<Student[]> {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) {
      console.error('Error fetching students:', error);
      throw error;
    }

    return data || [];
  },

  async getById(id: string): Promise<Student | null> {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching student:', error);
      return null;
    }

    return data;
  },

  async getByCPF(cpf: string): Promise<Student | null> {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('cpf', cpf)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('Error fetching student by CPF:', error);
      return null;
    }

    return data;
  },

  async create(student: StudentInsert): Promise<Student> {
    const { data, error } = await supabase
      .from('students')
      .insert(student)
      .select()
      .single();

    if (error) {
      console.error('Error creating student:', error);
      throw error;
    }

    return data;
  },

  async update(id: string, updates: StudentUpdate): Promise<Student> {
    const { data, error } = await supabase
      .from('students')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating student:', error);
      throw error;
    }

    return data;
  },

  async delete(id: string): Promise<boolean> {
    // Soft delete - only mark as inactive
    const { error } = await supabase
      .from('students')
      .update({ is_active: false })
      .eq('id', id);

    if (error) {
      console.error('Error deleting student:', error);
      return false;
    }

    return true;
  }
};

// =====================================================
// POLOS SERVICE
// =====================================================
export const polosService = {
  async getAll(): Promise<Polo[]> {
    const { data, error } = await supabase
      .from('polos')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) {
      console.error('Error fetching polos:', error);
      throw error;
    }

    return data || [];
  },

  async getById(id: string): Promise<Polo | null> {
    const { data, error } = await supabase
      .from('polos')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching polo:', error);
      return null;
    }

    return data;
  },

  async create(polo: PoloInsert): Promise<Polo> {
    const { data, error } = await supabase
      .from('polos')
      .insert(polo)
      .select()
      .single();

    if (error) {
      console.error('Error creating polo:', error);
      throw error;
    }

    return data;
  },

  async update(id: string, updates: PoloUpdate): Promise<Polo> {
    const { data, error } = await supabase
      .from('polos')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating polo:', error);
      throw error;
    }

    return data;
  },

  async delete(id: string): Promise<boolean> {
    // Soft delete
    const { error } = await supabase
      .from('polos')
      .update({ is_active: false })
      .eq('id', id);

    if (error) {
      console.error('Error deleting polo:', error);
      return false;
    }

    return true;
  }
};

// =====================================================
// ADMIN USERS SERVICE
// =====================================================
export const adminUsersService = {
  async getAll(): Promise<AdminUser[]> {
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) {
      console.error('Error fetching admin users:', error);
      throw error;
    }

    return data || [];
  },

  async getByEmail(email: string): Promise<AdminUser | null> {
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('Error fetching admin user by email:', error);
      return null;
    }

    return data;
  },

  async getById(id: string): Promise<AdminUser | null> {
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching admin user:', error);
      return null;
    }

    return data;
  },

  async create(adminUser: AdminUserInsert): Promise<AdminUser> {
    const { data, error } = await supabase
      .from('admin_users')
      .insert(adminUser)
      .select()
      .single();

    if (error) {
      console.error('Error creating admin user:', error);
      throw error;
    }

    return data;
  },

  async update(id: string, updates: AdminUserUpdate): Promise<AdminUser> {
    const { data, error } = await supabase
      .from('admin_users')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating admin user:', error);
      throw error;
    }

    return data;
  },

  async delete(id: string): Promise<boolean> {
    // Soft delete
    const { error } = await supabase
      .from('admin_users')
      .update({ is_active: false })
      .eq('id', id);

    if (error) {
      console.error('Error deleting admin user:', error);
      return false;
    }

    return true;
  },

  async authenticate(email: string, password: string): Promise<AdminUser | null> {
    // Esta função precisa ser implementada no backend ou usando função do Supabase
    // Por enquanto, retornamos null para segurança
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .eq('is_active', true)
      .single();

    if (error || !data) {
      console.error('Authentication failed:', error);
      return null;
    }

    // Por enquanto, usamos uma verificação simples
    // TODO: Implementar verificação real de senha com hash
    if (password === 'admin123') {
      return data;
    }

    return null;
  }
};

// =====================================================
// STAFF MEMBERS SERVICE
// =====================================================
export const staffService = {
  async getAll(): Promise<StaffMember[]> {
    const { data, error } = await supabase
      .from('staff_members')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) {
      console.error('Error fetching staff members:', error);
      throw error;
    }

    return data || [];
  },

  async getByPolo(poloId: string): Promise<StaffMember[]> {
    const { data, error } = await supabase
      .from('staff_members')
      .select('*')
      .eq('polo_id', poloId)
      .eq('is_active', true)
      .order('name');

    if (error) {
      console.error('Error fetching staff members by polo:', error);
      throw error;
    }

    return data || [];
  },

  async getById(id: string): Promise<StaffMember | null> {
    const { data, error } = await supabase
      .from('staff_members')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching staff member:', error);
      return null;
    }

    return data;
  },

  async create(staff: StaffMemberInsert): Promise<StaffMember> {
    const { data, error } = await supabase
      .from('staff_members')
      .insert(staff)
      .select()
      .single();

    if (error) {
      console.error('Error creating staff member:', error);
      throw error;
    }

    return data;
  },

  async update(id: string, updates: StaffMemberUpdate): Promise<StaffMember> {
    const { data, error } = await supabase
      .from('staff_members')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating staff member:', error);
      throw error;
    }

    return data;
  },

  async delete(id: string): Promise<boolean> {
    // Soft delete
    const { error } = await supabase
      .from('staff_members')
      .update({ is_active: false })
      .eq('id', id);

    if (error) {
      console.error('Error deleting staff member:', error);
      return false;
    }

    return true;
  }
};

// =====================================================
// ENROLLMENTS SERVICE
// =====================================================
export const enrollmentsService = {
  async getAll(): Promise<Enrollment[]> {
    const { data, error } = await supabase
      .from('enrollments')
      .select(`
        *,
        students(name, phone, email),
        polos(name, city, state)
      `)
      .order('enrollment_date', { ascending: false });

    if (error) {
      console.error('Error fetching enrollments:', error);
      throw error;
    }

    return data || [];
  },

  async getByStudent(studentId: string): Promise<Enrollment[]> {
    const { data, error } = await supabase
      .from('enrollments')
      .select(`
        *,
        students(name, phone, email),
        polos(name, city, state)
      `)
      .eq('student_id', studentId)
      .order('enrollment_date', { ascending: false });

    if (error) {
      console.error('Error fetching enrollments by student:', error);
      throw error;
    }

    return data || [];
  },

  async getByPolo(poloId: string): Promise<Enrollment[]> {
    const { data, error } = await supabase
      .from('enrollments')
      .select(`
        *,
        students(name, phone, email),
        polos(name, city, state)
      `)
      .eq('polo_id', poloId)
      .order('enrollment_date', { ascending: false });

    if (error) {
      console.error('Error fetching enrollments by polo:', error);
      throw error;
    }

    return data || [];
  },

  async getById(id: string): Promise<Enrollment | null> {
    const { data, error } = await supabase
      .from('enrollments')
      .select(`
        *,
        students(*),
        polos(*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching enrollment:', error);
      return null;
    }

    return data;
  },

  async create(enrollment: EnrollmentInsert): Promise<Enrollment> {
    const { data, error } = await supabase
      .from('enrollments')
      .insert(enrollment)
      .select()
      .single();

    if (error) {
      console.error('Error creating enrollment:', error);
      throw error;
    }

    return data;
  },

  async update(id: string, updates: EnrollmentUpdate): Promise<Enrollment> {
    const { data, error } = await supabase
      .from('enrollments')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating enrollment:', error);
      throw error;
    }

    return data;
  },

  async delete(id: string): Promise<boolean> {
    // Soft delete - mark as cancelled
    const { error } = await supabase
      .from('enrollments')
      .update({ status: 'cancelled' })
      .eq('id', id);

    if (error) {
      console.error('Error deleting enrollment:', error);
      return false;
    }

    return true;
  }
};

// =====================================================
// CERTIFICATES SERVICE
// =====================================================
export const certificatesService = {
  async getAll(): Promise<Certificate[]> {
    const { data, error } = await supabase
      .from('certificates')
      .select(`
        *,
        students(name, cpf),
        enrollments(level),
        polos(name)
      `)
      .eq('is_valid', true)
      .order('issue_date', { ascending: false });

    if (error) {
      console.error('Error fetching certificates:', error);
      throw error;
    }

    return data || [];
  },

  async getByStudent(studentId: string): Promise<Certificate[]> {
    const { data, error } = await supabase
      .from('certificates')
      .select(`
        *,
        students(name, cpf),
        enrollments(level),
        polos(name)
      `)
      .eq('student_id', studentId)
      .eq('is_valid', true)
      .order('issue_date', { ascending: false });

    if (error) {
      console.error('Error fetching certificates by student:', error);
      throw error;
    }

    return data || [];
  },

  async create(certificate: CertificateInsert): Promise<Certificate> {
    const { data, error } = await supabase
      .from('certificates')
      .insert(certificate)
      .select()
      .single();

    if (error) {
      console.error('Error creating certificate:', error);
      throw error;
    }

    return data;
  },

  async generateCertificateNumber(): Promise<string> {
    // Gerar número único de certificado
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `IBUC-${year}-${randomNum}`;
  }
};

// =====================================================
// SYSTEM SETTINGS SERVICE
// =====================================================
export const systemSettingsService = {
  async getAll(): Promise<SystemSetting[]> {
    const { data, error } = await supabase
      .from('system_settings')
      .select('*')
      .order('category, key');

    if (error) {
      console.error('Error fetching system settings:', error);
      throw error;
    }

    return data || [];
  },

  async getByKey(key: string): Promise<SystemSetting | null> {
    const { data, error } = await supabase
      .from('system_settings')
      .select('*')
      .eq('key', key)
      .single();

    if (error) {
      console.error('Error fetching system setting:', error);
      return null;
    }

    return data;
  },

  async getValue(key: string, defaultValue: string = ''): Promise<string> {
    const setting = await this.getByKey(key);
    return setting?.value || defaultValue;
  },

  async update(key: string, value: string): Promise<SystemSetting> {
    const { data, error } = await supabase
      .from('system_settings')
      .update({ value, updated_at: new Date().toISOString() })
      .eq('key', key)
      .select()
      .single();

    if (error) {
      console.error('Error updating system setting:', error);
      throw error;
    }

    return data;
  },

  async create(setting: SystemSettingInsert): Promise<SystemSetting> {
    const { data, error } = await supabase
      .from('system_settings')
      .insert(setting)
      .select()
      .single();

    if (error) {
      console.error('Error creating system setting:', error);
      throw error;
    }

    return data;
  }
};

// =====================================================
// ANALYTICS AND STATISTICS
// =====================================================
export const analyticsService = {
  async getStudentStats(): Promise<{ total: number; active: number; completed: number }> {
    const { data: totalStudents } = await supabase
      .from('students')
      .select('id', { count: 'exact', head: true })
      .eq('is_active', true);

    const { data: activeEnrollments } = await supabase
      .from('enrollments')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'active');

    const { data: completedEnrollments } = await supabase
      .from('enrollments')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'completed');

    return {
      total: totalStudents?.length || 0,
      active: activeEnrollments?.length || 0,
      completed: completedEnrollments?.length || 0
    };
  },

  async getPolosStats() {
    const { data, error } = await supabase
      .from('students_stats_by_polo')
      .select('*');

    if (error) {
      console.error('Error fetching polos stats:', error);
      return [];
    }

    return data || [];
  },

  async getActiveEnrollmentsDetails() {
    const { data, error } = await supabase
      .from('active_enrollments_details')
      .select('*');

    if (error) {
      console.error('Error fetching active enrollments details:', error);
      return [];
    }

    return data || [];
  }
};

// =====================================================
// REAL-TIME SUBSCRIPTIONS
// =====================================================
export const subscriptions = {
  subscribeToStudents(callback: (payload: any) => void) {
    return supabase
      .channel('students-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'students'
      }, callback)
      .subscribe();
  },

  subscribeToEnrollments(callback: (payload: any) => void) {
    return supabase
      .channel('enrollments-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'enrollments'
      }, callback)
      .subscribe();
  },

  subscribeToPolos(callback: (payload: any) => void) {
    return supabase
      .channel('polos-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'polos'
      }, callback)
      .subscribe();
  }
};