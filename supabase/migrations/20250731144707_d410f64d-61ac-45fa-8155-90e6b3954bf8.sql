-- Fix OTP expiry settings for production readiness
-- Set OTP expiry to recommended 10 minutes (600 seconds)
UPDATE auth.config 
SET value = '600' 
WHERE parameter = 'max_password_length' OR parameter = 'password_min_length';

-- Ensure secure OTP settings
INSERT INTO auth.config (parameter, value) 
VALUES ('otp_exp', '600')
ON CONFLICT (parameter) 
DO UPDATE SET value = '600';