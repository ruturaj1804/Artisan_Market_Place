import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import { Checkbox } from "../../../components/ui/Checkbox";
import { useNavigate } from "react-router-dom";

// db config file 
import { auth } from "dbConfig/config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const RegistrationForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "",
    state: "",
    craftSpecialization: "",
    agreeToTerms: false,
    subscribeNewsletter: false,
  });

  const isClick = async () => {
    if (formData.password != "" && formData.email != "") {
      try {
        const res = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        navigate("/home"); // redirect to Dashboard

      } catch (error) {
        console.log("Error Duplicate User");
        
      }    
      console.log(res);
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        userType: "",
        state: "",
        craftSpecialization: "",
        agreeToTerms: false,
        subscribeNewsletter: false,
      });
    }
  };

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const userTypeOptions = [
    {
      value: "artisan",
      label: "Artisan",
      description: "I create and sell handcrafted products",
    },
    {
      value: "buyer",
      label: "Buyer",
      description: "I want to discover and purchase authentic crafts",
    },
  ];

  const stateOptions = [
    { value: "andhra-pradesh", label: "Andhra Pradesh" },
    { value: "arunachal-pradesh", label: "Arunachal Pradesh" },
    { value: "assam", label: "Assam" },
    { value: "bihar", label: "Bihar" },
    { value: "chhattisgarh", label: "Chhattisgarh" },
    { value: "goa", label: "Goa" },
    { value: "gujarat", label: "Gujarat" },
    { value: "haryana", label: "Haryana" },
    { value: "himachal-pradesh", label: "Himachal Pradesh" },
    { value: "jharkhand", label: "Jharkhand" },
    { value: "karnataka", label: "Karnataka" },
    { value: "kerala", label: "Kerala" },
    { value: "madhya-pradesh", label: "Madhya Pradesh" },
    { value: "maharashtra", label: "Maharashtra" },
    { value: "manipur", label: "Manipur" },
    { value: "meghalaya", label: "Meghalaya" },
    { value: "mizoram", label: "Mizoram" },
    { value: "nagaland", label: "Nagaland" },
    { value: "odisha", label: "Odisha" },
    { value: "punjab", label: "Punjab" },
    { value: "rajasthan", label: "Rajasthan" },
    { value: "sikkim", label: "Sikkim" },
    { value: "tamil-nadu", label: "Tamil Nadu" },
    { value: "telangana", label: "Telangana" },
    { value: "tripura", label: "Tripura" },
    { value: "uttar-pradesh", label: "Uttar Pradesh" },
    { value: "uttarakhand", label: "Uttarakhand" },
    { value: "west-bengal", label: "West Bengal" },
    { value: "delhi", label: "Delhi" },
    { value: "jammu-kashmir", label: "Jammu & Kashmir" },
    { value: "ladakh", label: "Ladakh" },
  ];

  const craftOptions = [
    { value: "warli-painting", label: "Warli Painting" },
    { value: "madhubani-art", label: "Madhubani Art" },
    { value: "pashmina-weaving", label: "Pashmina Weaving" },
    { value: "channapatna-toys", label: "Channapatna Toys" },
    { value: "pottery-ceramics", label: "Pottery & Ceramics" },
    { value: "handloom-textiles", label: "Handloom Textiles" },
    { value: "jewelry-making", label: "Jewelry Making" },
    { value: "wood-carving", label: "Wood Carving" },
    { value: "metal-crafts", label: "Metal Crafts" },
    { value: "leather-work", label: "Leather Work" },
    { value: "bamboo-crafts", label: "Bamboo Crafts" },
    { value: "stone-carving", label: "Stone Carving" },
    { value: "embroidery", label: "Embroidery" },
    { value: "block-printing", label: "Block Printing" },
    { value: "other", label: "Other Traditional Craft" },
  ];

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength += 25;
    if (/[a-z]/?.test(password)) strength += 25;
    if (/[A-Z]/?.test(password)) strength += 25;
    if (/[0-9]/?.test(password)) strength += 25;
    return strength;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // console.log(formData)

    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }

    // Calculate password strength
    if (field === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.fullName?.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData?.email?.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData?.password) {
      newErrors.password = "Password is required";
    } else if (formData?.password?.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData?.userType) {
      newErrors.userType = "Please select your user type";
    }

    if (formData?.userType === "artisan") {
      if (!formData?.state) {
        newErrors.state = "Please select your state";
      }
      if (!formData?.craftSpecialization) {
        newErrors.craftSpecialization =
          "Please select your craft specialization";
      }
    }

    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return "bg-error";
    if (passwordStrength < 50) return "bg-warning";
    if (passwordStrength < 75) return "bg-accent";
    return "bg-success";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return "Weak";
    if (passwordStrength < 50) return "Fair";
    if (passwordStrength < 75) return "Good";
    return "Strong";
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="font-heading font-semibold text-lg text-foreground">
          Basic Information
        </h3>

        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={formData?.fullName}
          onChange={(e) => handleInputChange("fullName", e?.target?.value)}
          error={errors?.fullName}
          required
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          value={formData?.email}
          onChange={(e) => handleInputChange("email", e?.target?.value)}
          error={errors?.email}
          required
        />

        <div className="space-y-2">
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              value={formData?.password}
              onChange={(e) => handleInputChange("password", e?.target?.value)}
              error={errors?.password}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-8 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} />
            </button>
          </div>

          {formData?.password && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  Password strength:
                </span>
                <span
                  className={`font-medium ${
                    passwordStrength < 50
                      ? "text-error"
                      : passwordStrength < 75
                      ? "text-warning"
                      : "text-success"
                  }`}
                >
                  {getPasswordStrengthText()}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                  style={{ width: `${passwordStrength}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <Input
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={formData?.confirmPassword}
            onChange={(e) =>
              handleInputChange("confirmPassword", e?.target?.value)
            }
            error={errors?.confirmPassword}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-8 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={16} />
          </button>
        </div>
      </div>
      {/* User Type Selection */}
      <div className="space-y-4">
        <h3 className="font-heading font-semibold text-lg text-foreground">
          Account Type
        </h3>

        <Select
          label="I am a..."
          placeholder="Select your account type"
          options={userTypeOptions}
          value={formData?.userType}
          onChange={(value) => handleInputChange("userType", value)}
          error={errors?.userType}
          required
        />
      </div>
      {/* Artisan-specific fields */}
      {formData?.userType === "artisan" && (
        <div className="space-y-4 p-4 bg-accent/10 rounded-lg border border-accent/20">
          <h3 className="font-heading font-semibold text-lg text-foreground flex items-center space-x-2">
            <Icon name="Palette" size={20} className="text-primary" />
            <span>Artisan Details</span>
          </h3>

          <Select
            label="State/Region"
            placeholder="Select your state"
            options={stateOptions}
            value={formData?.state}
            onChange={(value) => handleInputChange("state", value)}
            error={errors?.state}
            searchable
            required
          />

          <Select
            label="Primary Craft Specialization"
            placeholder="Select your main craft type"
            options={craftOptions}
            value={formData?.craftSpecialization}
            onChange={(value) =>
              handleInputChange("craftSpecialization", value)
            }
            error={errors?.craftSpecialization}
            searchable
            required
          />
        </div>
      )}
      {/* Terms and Newsletter */}
      <div className="space-y-4">
        <Checkbox
          label="I agree to the Terms of Service and Privacy Policy"
          checked={formData?.agreeToTerms}
          onChange={(e) =>
            handleInputChange("agreeToTerms", e?.target?.checked)
          }
          error={errors?.agreeToTerms}
          required
        />

        <Checkbox
          label="Subscribe to newsletter for artisan tips and marketplace updates"
          description="Get weekly insights about traditional crafts and marketplace trends"
          checked={formData?.subscribeNewsletter}
          onChange={(e) =>
            handleInputChange("subscribeNewsletter", e?.target?.checked)
          }
        />
      </div>
      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        onClick={isClick}
        iconName="UserPlus"
        iconPosition="left"
        className="mt-8"
      >
        Create Account
      </Button>
      {/* Login Link */}
      <div className="text-center pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegistrationForm;
