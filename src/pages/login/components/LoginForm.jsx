import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

// db config 
import { auth } from "dbConfig/config";
import { signInWithEmailAndPassword } from "firebase/auth";



const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);


  const isClick = async ()=>{
    if (formData.email != '' && formData.password != '') {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        navigate('/homepage-landing');       
      } catch (error) {
        console.log("some error ocuur");
        setErrors({
         submit: `Invalid User`
       });
        
      }
    }
    
  }

  // Mock credentials for different user types
  const mockCredentials = {
    artisan: { email: 'artisan@craftmaker.in', password: 'craft123' },
    buyer: { email: 'buyer@shopper.in', password: 'shop456' },
    admin: { email: 'admin@artisanai.in', password: 'admin789' }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    console.log(formData)
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const isValidCredentials = Object.values(mockCredentials)?.some(
        cred => cred?.email === formData?.email && cred?.password === formData?.password
      );
      
      if (isValidCredentials) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData?.email);
        navigate('/homepage-landing');
      } else {
        console.log("erro from another");
        
       
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    // Simulate social login
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', `user@${provider}.com`);
      navigate('/homepage-landing');
    }, 1000);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card border border-border rounded-lg shadow-warm-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="LogIn" size={24} className="text-primary-foreground" />
          </div>
          <h1 className="font-heading text-2xl font-semibold text-foreground mb-2">
            Welcome Back
          </h1>
          <p className="text-muted-foreground text-sm">
            Sign in to your ArtisanAI account to continue exploring authentic crafts
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
            className="w-full"
          />

          {/* Password Input */}
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
            className="w-full"
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <Checkbox
              label="Remember me"
              name="rememberMe"
              checked={formData?.rememberMe}
              onChange={handleInputChange}
              size="sm"
            />
            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Error */}
          {errors?.submit && (
            <div className="bg-error/10 border border-error/20 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <Icon name="AlertCircle" size={16} className="text-error mt-0.5 flex-shrink-0" />
                <p className="text-sm text-error font-medium">
                  {errors?.submit}
                </p>
              </div>
            </div>
          )}

          {/* Sign In Button */}
          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            onClick = {isClick}
            iconName="LogIn"
            iconPosition="left"
          >
            Sign In
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-card text-muted-foreground">Or continue with</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="space-y-3">
          <Button
            variant="outline"
            fullWidth
            onClick={() => handleSocialLogin('google')}
            iconName="Chrome"
            iconPosition="left"
            disabled={isLoading}
          >
            Continue with Google
          </Button>
        </div>

        {/* Register Link */}
        <div className="text-center mt-8 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            New to ArtisanAI?{' '}
            <Link
              to="/register"
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Create an account
            </Link>
          </p>
        </div>

        {/* Guest Access */}
        <div className="text-center mt-4">
          <Link
            to="/product-catalog"
            className="text-sm text-accent hover:text-accent/80 transition-colors font-medium inline-flex items-center space-x-1"
          >
            <Icon name="Eye" size={14} />
            <span>Browse as guest</span>
          </Link>
        </div>
      </div>
      {/* Cultural accent */}
      <div className="flex justify-center mt-6 space-x-2">
        <div className="w-2 h-2 bg-accent rounded-full opacity-60"></div>
        <div className="w-3 h-3 bg-primary rounded-full opacity-40"></div>
        <div className="w-2 h-2 bg-accent rounded-full opacity-60"></div>
      </div>
    </div>
  );
};

export default LoginForm;