import React from 'react'

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AuthCredentialsFieldsProps {
  email: string;
  password: string;
  confirmPassword: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
}

const AuthCredentialsFields = ({
  email,
  password,
  confirmPassword,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
}: AuthCredentialsFieldsProps) => {
  return (
    <>
      <div>
        <Label htmlFor="email" className="text-neutral700">
          Email address
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="john@example.com"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className="mt-1 focus:ring-defaultgreen focus:border-defaultgreen"
        />
      </div>

      <div>
        <Label htmlFor="password" className="text-neutral700">
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          placeholder="At least 6 characters"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          className="mt-1 focus:ring-defaultgreen focus:border-defaultgreen"
        />
      </div>

      <div>
        <Label htmlFor="confirmPassword" className="text-neutral700">
          Confirm Password
        </Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => onConfirmPasswordChange(e.target.value)}
          className="mt-1 focus:ring-defaultgreen focus:border-defaultgreen"
        />
      </div>
    </>
  )
}

export default AuthCredentialsFields