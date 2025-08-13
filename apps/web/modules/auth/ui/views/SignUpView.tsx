import { SignUp } from '@clerk/nextjs'

const SignUpView = () => {
  return (
    <div>
        <SignUp routing='hash' />
    </div>
  )
}

export default SignUpView