import { SignIn } from '@clerk/nextjs'

const SignInView = () => {
  return (
    <div>
      <SignIn routing='hash' />
    </div>
  )
}

export default SignInView