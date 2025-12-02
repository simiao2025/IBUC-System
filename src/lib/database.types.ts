export interface Database {
  public: {
    Tables: {
      students: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          name: string;
          birth_date: string;
          cpf: string;
          gender: 'male' | 'female' | 'other';
          phone: string;
          email: string;
          cep: string;
          street: string;
          number: string;
          complement?: string;
          neighborhood: string;
          city: string;
          state: string;
          father_name: string;
          mother_name: string;
          parents_phone: string;
          parents_email: string;
          father_cpf: string;
          mother_cpf: string;
          is_active: boolean;
        };
        Insert: Omit<Database['public']['Tables']['students']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['students']['Insert']>;
      };
      polos: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          name: string;
          street: string;
          number: string;
          neighborhood: string;
          city: string;
          state: string;
          cep: string;
          pastor: string;
          coordinator_name: string;
          coordinator_cpf: string;
          director_name?: string;
          director_cpf?: string;
          secretary_name?: string;
          secretary_cpf?: string;
          treasurer_name?: string;
          treasurer_cpf?: string;
          teachers: string[];
          assistants?: string[];
          cafeteria_workers?: string[];
          available_levels: string[];
          is_active: boolean;
        };
        Insert: Omit<Database['public']['Tables']['polos']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['polos']['Insert']>;
      };
      admin_users: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          name: string;
          email: string;
          cpf: string;
          phone: string;
          role: 'coordenador_geral' | 'diretor_geral' | 'coordenador_polo' | 'diretor_polo' | 'professor' | 'auxiliar' | 'secretario' | 'tesoureiro';
          access_level: 'geral' | 'polo_especifico';
          polo_id?: string;
          is_active: boolean;
          password_hash: string;
        };
        Insert: Omit<Database['public']['Tables']['admin_users']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['admin_users']['Insert']>;
      };
      staff_members: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          name: string;
          cpf: string;
          phone: string;
          email: string;
          role: 'coordenador_geral' | 'diretor_geral' | 'coordenador_polo' | 'diretor_polo' | 'professor' | 'auxiliar' | 'secretario' | 'tesoureiro';
          polo_id: string;
          is_active: boolean;
          qualifications?: string[];
          hire_date: string;
        };
        Insert: Omit<Database['public']['Tables']['staff_members']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['staff_members']['Insert']>;
      };
      enrollments: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          student_id: string;
          student_name: string;
          level: 'NIVEL_I' | 'NIVEL_II' | 'NIVEL_III' | 'NIVEL_IV';
          polo_id: string;
          polo_name: string;
          enrollment_date: string;
          observations?: string;
          status: 'active' | 'completed' | 'cancelled' | 'transferred';
          completion_date?: string;
          certificate_issued: boolean;
          certificate_date?: string;
        };
        Insert: Omit<Database['public']['Tables']['enrollments']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['enrollments']['Insert']>;
      };
      certificates: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          student_id: string;
          enrollment_id: string;
          certificate_number: string;
          issue_date: string;
          level: 'NIVEL_I' | 'NIVEL_II' | 'NIVEL_III' | 'NIVEL_IV';
          polo_id: string;
          grade: number;
          hours_completed: number;
          is_valid: boolean;
        };
        Insert: Omit<Database['public']['Tables']['certificates']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['certificates']['Insert']>;
      };
      system_settings: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          key: string;
          value: string;
          description?: string;
          category: string;
        };
        Insert: Omit<Database['public']['Tables']['system_settings']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['system_settings']['Insert']>;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}