import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  studentsService, 
  polosService, 
  adminUsersService, 
  enrollmentsService,
  staffService,
  analyticsService
} from '../lib/supabase-services';
import type { 
  StudentData, 
  Enrollment, 
  Polo, 
  User, 
  AdminUser, 
  AccessLevel 
} from '../types';

// Tipos para o contexto
interface SupabaseContextType {
  // Loading states
  isLoading: boolean;
  
  // Students
  students: StudentData[];
  addStudent: (student: StudentData) => Promise<void>;
  updateStudent: (id: string, student: Partial<StudentData>) => Promise<void>;
  deleteStudent: (id: string) => Promise<void>;
  
  // Enrollments
  enrollments: Enrollment[];
  addEnrollment: (enrollment: Enrollment) => Promise<void>;
  updateEnrollment: (id: string, enrollment: Partial<Enrollment>) => Promise<void>;
  
  // Polos
  polos: Polo[];
  addPolo: (polo: Polo) => Promise<void>;
  updatePolo: (id: string, polo: Polo) => Promise<void>;
  deletePolo: (id: string) => Promise<void>;
  
  // Authentication
  currentUser: User | null;
  login: (email: string, password: string, role: 'admin' | 'student') => Promise<boolean>;
  logout: () => void;

  // Admin access control
  hasAccessToAllPolos: () => boolean;
  hasAccessToPolo: (poloId: string) => boolean;
  getCurrentUserAccessLevel: () => AccessLevel | null;
  getUserAllowedPolos: () => string[];
  
  // Data refresh
  refreshData: () => Promise<void>;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

export const SupabaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState<StudentData[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [polos, setPolos] = useState<Polo[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Convert Supabase student to our StudentData format
  const convertStudent = (supabaseStudent: any): StudentData => {
    return {
      id: supabaseStudent.id,
      name: supabaseStudent.name,
      birthDate: supabaseStudent.birth_date,
      cpf: supabaseStudent.cpf,
      gender: supabaseStudent.gender,
      address: {
        cep: supabaseStudent.cep,
        street: supabaseStudent.street,
        number: supabaseStudent.number,
        neighborhood: supabaseStudent.neighborhood,
        city: supabaseStudent.city,
        state: supabaseStudent.state,
        complement: supabaseStudent.complement
      },
      phone: supabaseStudent.phone,
      email: supabaseStudent.email,
      parents: {
        fatherName: supabaseStudent.father_name,
        motherName: supabaseStudent.mother_name,
        phone: supabaseStudent.parents_phone,
        email: supabaseStudent.parents_email,
        fatherCpf: supabaseStudent.father_cpf,
        motherCpf: supabaseStudent.mother_cpf
      }
    };
  };

  // Convert Supabase polo to our Polo format
  const convertPolo = (supabasePolo: any): Polo => {
    return {
      id: supabasePolo.id,
      name: supabasePolo.name,
      address: {
        street: supabasePolo.street,
        number: supabasePolo.number,
        neighborhood: supabasePolo.neighborhood,
        city: supabasePolo.city,
        state: supabasePolo.state,
        cep: supabasePolo.cep
      },
      pastor: supabasePolo.pastor,
      coordinator: {
        name: supabasePolo.coordinator_name,
        cpf: supabasePolo.coordinator_cpf
      },
      director: supabasePolo.director_name ? {
        name: supabasePolo.director_name,
        cpf: supabasePolo.director_cpf
      } : undefined,
      teachers: supabasePolo.teachers || [],
      assistants: supabasePolo.assistants || [],
      secretary: supabasePolo.secretary_name ? {
        name: supabasePolo.secretary_name,
        cpf: supabasePolo.secretary_cpf
      } : undefined,
      treasurer: supabasePolo.treasurer_name ? {
        name: supabasePolo.treasurer_name,
        cpf: supabasePolo.treasurer_cpf
      } : undefined,
      cafeteriaWorkers: supabasePolo.cafeteria_workers || [],
      availableLevels: supabasePolo.available_levels,
      isActive: supabasePolo.is_active,
      createdAt: supabasePolo.created_at,
      staff: []
    };
  };

  // Load initial data
  const loadData = async () => {
    try {
      setIsLoading(true);
      
      // Load students
      const studentsData = await studentsService.getAll();
      setStudents(studentsData.map(convertStudent));
      
      // Load polos
      const polosData = await polosService.getAll();
      setPolos(polosData.map(convertPolo));
      
      // Load enrollments
      const enrollmentsData = await enrollmentsService.getAll();
      setEnrollments(enrollmentsData);
      
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadData();
  }, []);

  // Student operations
  const addStudent = async (student: StudentData) => {
    try {
      const studentData = {
        name: student.name,
        birth_date: student.birthDate,
        cpf: student.cpf,
        gender: student.gender,
        phone: student.phone,
        email: student.email,
        cep: student.address.cep,
        street: student.address.street,
        number: student.address.number,
        complement: student.address.complement,
        neighborhood: student.address.neighborhood,
        city: student.address.city,
        state: student.address.state,
        father_name: student.parents.fatherName,
        mother_name: student.parents.motherName,
        parents_phone: student.parents.phone,
        parents_email: student.parents.email,
        father_cpf: student.parents.fatherCpf,
        mother_cpf: student.parents.motherCpf,
        is_active: true
      };

      const newStudent = await studentsService.create(studentData);
      setStudents(prev => [...prev, convertStudent(newStudent)]);
    } catch (error) {
      console.error('Error adding student:', error);
      throw error;
    }
  };

  const updateStudent = async (id: string, updates: Partial<StudentData>) => {
    try {
      const studentData = {
        name: updates.name,
        birth_date: updates.birthDate,
        gender: updates.gender,
        phone: updates.phone,
        email: updates.email,
        cep: updates.address?.cep,
        street: updates.address?.street,
        number: updates.address?.number,
        complement: updates.address?.complement,
        neighborhood: updates.address?.neighborhood,
        city: updates.address?.city,
        state: updates.address?.state,
        father_name: updates.parents?.fatherName,
        mother_name: updates.parents?.motherName,
        parents_phone: updates.parents?.phone,
        parents_email: updates.parents?.email,
        father_cpf: updates.parents?.fatherCpf,
        mother_cpf: updates.parents?.motherCpf
      };

      const updatedStudent = await studentsService.update(id, studentData);
      setStudents(prev => 
        prev.map(s => s.id === id ? convertStudent(updatedStudent) : s)
      );
    } catch (error) {
      console.error('Error updating student:', error);
      throw error;
    }
  };

  const deleteStudent = async (id: string) => {
    try {
      await studentsService.delete(id);
      setStudents(prev => prev.filter(s => s.id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
      throw error;
    }
  };

  // Polo operations
  const addPolo = async (polo: Polo) => {
    try {
      const poloData = {
        name: polo.name,
        street: polo.address.street,
        number: polo.address.number,
        neighborhood: polo.address.neighborhood,
        city: polo.address.city,
        state: polo.address.state,
        cep: polo.address.cep,
        pastor: polo.pastor,
        coordinator_name: polo.coordinator.name,
        coordinator_cpf: polo.coordinator.cpf,
        director_name: polo.director?.name,
        director_cpf: polo.director?.cpf,
        secretary_name: polo.secretary?.name,
        secretary_cpf: polo.secretary?.cpf,
        treasurer_name: polo.treasurer?.name,
        treasurer_cpf: polo.treasurer?.cpf,
        teachers: polo.teachers,
        assistants: polo.assistants,
        cafeteria_workers: polo.cafeteriaWorkers,
        available_levels: polo.availableLevels,
        is_active: polo.isActive
      };

      const newPolo = await polosService.create(poloData);
      setPolos(prev => [...prev, convertPolo(newPolo)]);
    } catch (error) {
      console.error('Error adding polo:', error);
      throw error;
    }
  };

  const updatePolo = async (id: string, polo: Polo) => {
    try {
      const poloData = {
        name: polo.name,
        street: polo.address.street,
        number: polo.address.number,
        neighborhood: polo.address.neighborhood,
        city: polo.address.city,
        state: polo.address.state,
        cep: polo.address.cep,
        pastor: polo.pastor,
        coordinator_name: polo.coordinator.name,
        coordinator_cpf: polo.coordinator.cpf,
        director_name: polo.director?.name,
        director_cpf: polo.director?.cpf,
        secretary_name: polo.secretary?.name,
        secretary_cpf: polo.secretary?.cpf,
        treasurer_name: polo.treasurer?.name,
        treasurer_cpf: polo.treasurer?.cpf,
        teachers: polo.teachers,
        assistants: polo.assistants,
        cafeteria_workers: polo.cafeteriaWorkers,
        available_levels: polo.availableLevels,
        is_active: polo.isActive
      };

      const updatedPolo = await polosService.update(id, poloData);
      setPolos(prev => 
        prev.map(p => p.id === id ? convertPolo(updatedPolo) : p)
      );
    } catch (error) {
      console.error('Error updating polo:', error);
      throw error;
    }
  };

  const deletePolo = async (id: string) => {
    try {
      await polosService.delete(id);
      setPolos(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting polo:', error);
      throw error;
    }
  };

  // Enrollment operations
  const addEnrollment = async (enrollment: Enrollment) => {
    try {
      const enrollmentData = {
        student_id: enrollment.studentId,
        student_name: enrollment.studentName,
        level: enrollment.level,
        polo_id: enrollment.polo,
        polo_name: polos.find(p => p.id === enrollment.polo)?.name || '',
        enrollment_date: enrollment.enrollmentDate,
        observations: enrollment.observations,
        status: 'active',
        certificate_issued: false
      };

      const newEnrollment = await enrollmentsService.create(enrollmentData);
      setEnrollments(prev => [...prev, newEnrollment]);
    } catch (error) {
      console.error('Error adding enrollment:', error);
      throw error;
    }
  };

  const updateEnrollment = async (id: string, updates: Partial<Enrollment>) => {
    try {
      const updatedEnrollment = await enrollmentsService.update(id, updates);
      setEnrollments(prev => 
        prev.map(e => e.id === id ? updatedEnrollment : e)
      );
    } catch (error) {
      console.error('Error updating enrollment:', error);
      throw error;
    }
  };

  // Authentication
  const login = async (email: string, password: string, role: 'admin' | 'student'): Promise<boolean> => {
    try {
      if (role === 'admin') {
        const adminUser = await adminUsersService.authenticate(email, password);
        if (adminUser) {
          const user: User = {
            id: adminUser.id,
            email: adminUser.email,
            role: 'admin',
            adminUser: {
              id: adminUser.id,
              name: adminUser.name,
              email: adminUser.email,
              cpf: adminUser.cpf,
              phone: adminUser.phone,
              role: adminUser.role,
              accessLevel: adminUser.access_level,
              poloId: adminUser.polo_id,
              isActive: adminUser.is_active,
              createdAt: adminUser.created_at,
              updatedAt: adminUser.updated_at
            }
          };
          setCurrentUser(user);
          return true;
        }
      } else if (role === 'student') {
        // Buscar student pelo CPF (email)
        const student = await studentsService.getByCPF(email);
        if (student && password === 'senha123') {
          const user: User = {
            id: student.id,
            email: student.email,
            role: 'student',
            studentId: student.id
          };
          setCurrentUser(user);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // Admin access control methods
  const hasAccessToAllPolos = (): boolean => {
    if (!currentUser || currentUser.role !== 'admin') return false;
    if (!currentUser.adminUser) return false;
    
    return currentUser.adminUser.accessLevel === 'geral' &&
           ['coordenador_geral', 'diretor_geral'].includes(currentUser.adminUser.role);
  };

  const hasAccessToPolo = (poloId: string): boolean => {
    if (!currentUser || currentUser.role !== 'admin') return false;

    // Se tem acesso geral, pode acessar qualquer polo
    if (hasAccessToAllPolos()) return true;

    // Se tem acesso específico, só pode acessar seu polo
    if (currentUser.adminUser?.accessLevel === 'polo_especifico') {
      return currentUser.adminUser.poloId === poloId;
    }

    return false;
  };

  const getCurrentUserAccessLevel = (): AccessLevel | null => {
    if (!currentUser || currentUser.role !== 'admin') return null;
    return currentUser.adminUser?.accessLevel || 'geral';
  };

  const getUserAllowedPolos = (): string[] => {
    if (!currentUser || currentUser.role !== 'admin') return [];

    if (hasAccessToAllPolos()) {
      return polos.map(polo => polo.id);
    }

    if (currentUser.adminUser?.accessLevel === 'polo_especifico' && currentUser.adminUser.poloId) {
      return [currentUser.adminUser.poloId];
    }

    return [];
  };

  // Refresh data
  const refreshData = async () => {
    await loadData();
  };

  return (
    <SupabaseContext.Provider value={{
      isLoading,
      students,
      addStudent,
      updateStudent,
      deleteStudent,
      enrollments,
      addEnrollment,
      updateEnrollment,
      polos,
      addPolo,
      updatePolo,
      deletePolo,
      currentUser,
      login,
      logout,
      hasAccessToAllPolos,
      hasAccessToPolo,
      getCurrentUserAccessLevel,
      getUserAllowedPolos,
      refreshData
    }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};