import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { 
  User, Mail, Lock, Phone, Book, School, Hash, UserCircle,
  ChevronRight, ChevronLeft, Upload, Eye, EyeOff, AlertCircle
} from 'lucide-react'

// Course options
const courseOptions = [
  { value: "B.Tech", label: "Bachelor of Technology" },
  { value: "BCA", label: "Bachelor of Computer Applications" },
  { value: "BBA", label: "Bachelor of Business Administration" },
  { value: "Diploma", label: "Diploma" }
];

// Branch options by course
const branchesByCourse = {
  "B.Tech": [
    { value: "CSE", label: "Computer Science Engineering" },
    { value: "ECE", label: "Electronics & Communication Engineering" },
    { value: "EEE", label: "Electrical & Electronics Engineering" },
    { value: "ME", label: "Mechanical Engineering" },
    { value: "CE", label: "Civil Engineering" },
    { value: "IT", label: "Information Technology" }
  ],
  "Diploma": [
    { value: "CS", label: "Computer Science" },
    { value: "EC", label: "Electronics" },
    { value: "ME", label: "Mechanical" },
    { value: "CE", label: "Civil" }
  ],
  "BCA": [], // No branches for BCA
  "BBA": []  // No branches for BBA
};

const Signup = () => {
  const navigate = useNavigate()
  const { register, error: authError, clearError } = useAuth()
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState(() => {
    // Check if there's an error in sessionStorage
    const savedError = sessionStorage.getItem("signup_error");
    return savedError || '';
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [branchOptions, setBranchOptions] = useState([])
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    gender: '',
    semester: '',
    branch: '',
    rollNo: '',
    course: '',
    contactNo: '',
    profilePic: null
  })

  // Effect to persist error to sessionStorage
  useEffect(() => {
    if (formError) {
      sessionStorage.setItem("signup_error", formError);
    } else {
      sessionStorage.removeItem("signup_error");
    }
  }, [formError]);

  // Effect to set formError from context error
  useEffect(() => {
    if (authError) {
      console.log("Setting form error from context:", authError);
      setFormError(authError);
    }
  }, [authError]);

  // Update branch options when course changes
  useEffect(() => {
    if (formData.course) {
      setBranchOptions(branchesByCourse[formData.course] || []);
      
      // Reset branch if current selection is not valid for new course or if course has no branches
      if (formData.branch && 
          (branchesByCourse[formData.course]?.length === 0 || 
           !branchesByCourse[formData.course]?.some(b => b.value === formData.branch))) {
        setFormData(prev => ({ ...prev, branch: '' }));
      }
    } else {
      setBranchOptions([]);
    }
  }, [formData.course]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    // Special handling for semester to ensure it's within 1-8 range
    if (name === 'semester') {
      const semesterValue = parseInt(value);
      if (isNaN(semesterValue) || semesterValue < 1) {
        setFormData({ ...formData, [name]: '' });
      } else if (semesterValue > 8) {
        setFormData({ ...formData, [name]: '8' });
      } else {
        setFormData({ ...formData, [name]: value });
      }
      return;
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profilePic: e.target.files[0]
    })
  }

  // Function to dismiss error
  const dismissError = () => {
    setFormError("");
    sessionStorage.removeItem("signup_error");
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Add validation for password length
    if (formData.password && formData.password.length < 8) {
      setFormError("Password must be at least 8 characters long");
      return;
    }
    
    try {
      // Convert semester and contactNo to appropriate types
      const userData = {
        ...formData,
        semester: parseInt(formData.semester),
        contactNo: formData.contactNo ? parseInt(formData.contactNo) : undefined
      }
      
      setIsSubmitting(true)
      // Use the register function from AuthContext
      await register(userData)
      navigate('/')
    } catch (error) {
      console.error('Signup failed:', error)
      
      // Handle specific error messages for duplicates
      const errorMessage = error.message || "Registration failed. Please try again.";
      
      // Set more focused error messages based on the error
      if (errorMessage.includes("Username already exists")) {
        setFormError("This username is already taken. Please choose a different username.");
      } else if (errorMessage.includes("Email already exists")) {
        setFormError("This email is already registered. Please use a different email address.");
      } else if (errorMessage.includes("Roll number already exists")) {
        setFormError("This roll number is already registered in our system.");
      } else if (errorMessage.includes("Contact number already exists")) {
        setFormError("This contact number is already registered in our system.");
      } else {
        setFormError(errorMessage);
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const renderProgressBar = () => {
    return (
      <div className="w-full mb-8">
        <div className="flex justify-between items-center mb-2">
          <div className="text-xs font-medium text-gray-600 dark:text-dark-text-muted">Account</div>
          <div className="text-xs font-medium text-gray-600 dark:text-dark-text-muted">Academic Info</div>
          <div className="text-xs font-medium text-gray-600 dark:text-dark-text-muted">Profile</div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200 dark:bg-dark-border">
          <div style={{ width: `${(step / 3) * 100}%` }} className="transition-all duration-500 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-600 dark:bg-primary-500"></div>
        </div>
      </div>
    )
  }

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary mb-6">Account Information</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className="appearance-none block w-full pl-10 px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                    placeholder="johndoe"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full pl-10 px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className="appearance-none block w-full pl-10 pr-10 px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                    placeholder="••••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Password must be at least 8 characters long
                </p>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </>
        )
        
      case 2:
        return (
          <>
            <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary mb-6">Academic Information</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="course" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">
                  Course
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Book className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <select
                    id="course"
                    name="course"
                    required
                    className="appearance-none block w-full pl-10 px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                    value={formData.course}
                    onChange={handleChange}
                  >
                    <option value="">Select Course</option>
                    {courseOptions.map(course => (
                      <option key={course.value} value={course.value}>
                        {course.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {formData.course && branchesByCourse[formData.course]?.length > 0 && (
                <div>
                  <label htmlFor="branch" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">
                    Branch
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Book className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    </div>
                    <select
                      id="branch"
                      name="branch"
                      required
                      className="appearance-none block w-full pl-10 px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                      value={formData.branch}
                      onChange={handleChange}
                    >
                      <option value="">Select Branch</option>
                      {branchOptions.map(branch => (
                        <option key={branch.value} value={branch.value}>
                          {branch.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="semester" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">
                    Semester
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <School className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                      id="semester"
                      name="semester"
                      type="number"
                      min="1"
                      max="8"
                      required
                      className="appearance-none block w-full pl-10 px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                      placeholder="1-8"
                      value={formData.semester}
                      onChange={handleChange}
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Enter a value between 1 and 8
                  </p>
                </div>
                
                <div>
                  <label htmlFor="rollNo" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">
                    Roll Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Hash className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                      id="rollNo"
                      name="rollNo"
                      type="text"
                      required
                      className="appearance-none block w-full pl-10 px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                      placeholder="22CSE08"
                      value={formData.rollNo}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-white bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-colors duration-200"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </>
        )
        
      case 3:
        return (
          <>
            <h3 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary mb-6">Personal Information</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">
                  Gender
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserCircle className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <select
                    id="gender"
                    name="gender"
                    required
                    className="appearance-none block w-full pl-10 px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="contactNo" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">
                  Contact Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    id="contactNo"
                    name="contactNo"
                    type="tel"
                    required
                    className="appearance-none block w-full pl-10 px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                    placeholder="+91 1234567890"
                    value={formData.contactNo}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="profilePic" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">
                  Profile Picture (Optional)
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                    <div className="flex text-sm text-gray-600 dark:text-gray-400">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white dark:bg-dark-card rounded-md font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="profilePic"
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                          accept="image/*"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PNG, JPG, GIF up to 10MB
                    </p>
                    {formData.profilePic && (
                      <p className="text-xs text-green-500">
                        File selected: {formData.profilePic.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4 sm:gap-0">
              <button
                type="button"
                onClick={prevStep}
                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-white bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-colors duration-200 w-full sm:w-auto order-2 sm:order-1"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200 w-full sm:w-auto order-1 sm:order-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          </>
        )
        
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-dark-text-primary">
            Join BitLinguals
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-dark-text-secondary">
            Create your account in a few simple steps
          </p>
        </div>
        
        <div className="mt-8 bg-white dark:bg-dark-card rounded-lg shadow-md dark:shadow-lg py-8 px-6 transition-all duration-300">
          {renderProgressBar()}
          
          {/* Simple inline error message */}
          {formError && (
            <div className="mb-6 bg-red-100 border border-red-400 rounded-md px-4 py-3 text-red-700">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                <p>{formError}</p>
              </div>
            </div>
          )}
          
          <form onSubmit={step === 3 ? handleSubmit : undefined}>
            {renderForm()}
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
