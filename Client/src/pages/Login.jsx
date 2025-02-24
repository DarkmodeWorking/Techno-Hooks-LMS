import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { useLoginUserMutation, useRegisterUserMutation } from '@/store/api/authAPI'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Login = () => {
  const [signupInput, setSignupInput] = useState({name: '', email: '', password: ''})
  const [loginInput, setLoginInput] = useState({email: '', password: ''})

  const [registerUser, {
    data: registerData, 
    error: registerError, 
    isLoading: registerIsLoading, 
    isSuccess: registerIsSuccess
  }] = useRegisterUserMutation()

  const [loginUser, {
    data: loginData,
    error: loginError,
    isLoading: loginIsLoading,
    isSuccess: loginIsSuccess 
  }] = useLoginUserMutation()

  const navigate = useNavigate()

  const changeInputHandler = (e, type) => {
    const {name, value} = e.target
    if (type === 'signup') {
      setSignupInput({...signupInput, [name]:value})
    }
    else {
      setLoginInput({...loginInput, [name]:value})
    }
  }

  const handleRegistration = async (type) => {
    const inputData = type === 'signup' ? signupInput : loginInput
    const action = type === 'signup' ? registerUser : loginUser
    await action(inputData)
  }

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || 'Signed Up successfully')
      navigate('/')
    }
    if (registerError) {
      toast.error(registerData.data.message || 'Sign Up Failed')
    }
    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || 'Signed In successfully')
      navigate('/')
    }
    if (loginError) {
      toast.error(loginError.data.message || 'Sign In Failed')
    }
  }, [loginIsLoading, loginIsSuccess, registerIsLoading, registerIsSuccess, loginData, registerData])

  return (
    <div className='flex items-center w-full justify-center h-screen'>
      <Tabs defaultValue='signup' className='w-[400px]'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='signup'>Sign Up</TabsTrigger>
          <TabsTrigger value='login'>Sign In</TabsTrigger>
        </TabsList>

        <TabsContent value='signup'>
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Create your new account and start learning
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='space-y-1'>
                <Label htmlFor='name'>Name</Label>
                <Input 
                  type='text' 
                  name='name'
                  value={signupInput.name}
                  placeholder='John Doe' 
                  onChange={(e) => changeInputHandler(e, 'signup')} 
                  required={true} />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='username'>E-Mail</Label>
                <Input 
                  type='email' 
                  name='email'
                  value={signupInput.email}
                  placeholder='john@doe.com' 
                  onChange={(e) => changeInputHandler(e, 'signup')}  
                  required={true} />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='username'>Password</Label>
                <Input 
                  type='password' 
                  name='password'
                  value={signupInput.password}
                  placeholder='********' 
                  onChange={(e) => changeInputHandler(e, 'signup')} 
                  required={true} />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={registerIsLoading} onClick={() => handleRegistration('signup')}>
                {
                  registerIsLoading ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait
                    </>
                  ) : 'Sign Up'
                }
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value='login'>
          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Log in to your account and continue learning
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='space-y-1'>
                <Label htmlFor='username'>E-Mail</Label>
                <Input 
                  type='email' 
                  name='email'
                  value={loginInput.email}
                  placeholder='john@doe.com' 
                  onChange={(e) => changeInputHandler(e, 'login')} 
                  required={true} />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='username'>Password</Label>
                <Input 
                  type='password' 
                  name='password'
                  value={loginInput.password}
                  placeholder='********' 
                  onChange={(e) => changeInputHandler(e, 'login')} 
                  required={true} />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={loginIsLoading} onClick={() => handleRegistration('login')}>
                {
                  loginIsLoading ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait
                    </>
                  ) : 'Log In'
                }
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Login