import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { login, register } from '@/api/userService';

import { toast } from 'sonner';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

import Lazy from '@/assets/LazyLogo.png';
import LoginBurger from '@/assets/BURGLOG.png';

const logiSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  pass: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
  rememberMe: z.boolean().optional(),
});

const regiSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: 'Username must be at least 2 characters.' }),
    email: z.email({ message: 'Invalid email address' }),
    phone: z.string().regex(/^08\d{8,11}$/, {
      message: 'Please enter a valid Indonesian phone number',
    }),
    pass: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters.' }),
    conpass: z
      .string()
      .min(6, { message: 'Confirmed password must be at least 6 characters.' }),
  })
  .refine((data) => data.pass === data.conpass, {
    message: 'Passwords do not match',
    path: ['conpass'],
  });

const LogRegi = () => {
  const navigate = useNavigate();
  const logiForm = useForm<z.infer<typeof logiSchema>>({
    resolver: zodResolver(logiSchema),
    defaultValues: {
      email: '',
      pass: '',
      rememberMe: false,
    },
  });
  const regiForm = useForm<z.infer<typeof regiSchema>>({
    resolver: zodResolver(regiSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      pass: '',
      conpass: '',
    },
  });

  const onLogin = async (data: z.infer<typeof logiSchema>) => {
    try {
      const res = await login({ email: data.email, password: data.pass });
      if (data.rememberMe) {
        localStorage.setItem('token', res.token);
      } else {
        sessionStorage.setItem('token', res.token);
      }

      toast('Welcome back!', {
        style: {
          background: '#079455',
          color: '#FAFAFA',
        },
      });
      navigate(`/Home`);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const response = err.response?.data as {
          message?: string;
          errors?: string[];
        };
        toast(
          response?.message || response?.errors?.join('\n') || 'Login failed',
          {
            style: {
              background: '#D9206E',
              color: '#FAFAFA',
            },
          }
        );
      } else if (err instanceof Error) {
        toast(err.message, {
          style: {
            background: '#D9206E',
            color: '#FAFAFA',
          },
        });
      } else {
        toast('Dunno man, some error I guess', {
          style: {
            background: '#D9206E',
            color: '#FAFAFA',
          },
        });
      }
    }
  };

  const onRegister = async (data: z.infer<typeof regiSchema>) => {
    const payload = {
      name: data.name,
      email: data.email,
      phone: String(data.phone),
      password: data.pass,
    };

    console.log('Register payload:', payload);

    try {
      const res = await register(payload);
      navigate(`/`);
      toast(
        `Registration success! Welcome, ${res.user.name}! Please login to start ordering!`,
        {
          style: {
            background: '#079455',
            color: '#FAFAFA',
          },
        }
      );
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const response = err.response?.data as {
          message?: string;
          errors?: Array<{ field?: string; message: string }>;
        };
        console.error('Registration error payload:', response);
        if (response?.errors?.length) {
          response.errors.forEach((e) =>
            console.error(
              `Field: ${e.field ?? 'unknown'}, Message: ${e.message}`
            )
          );
        }
        toast(
          response?.message ||
            response?.errors?.map((e) => e.message).join('\n') ||
            'Registration failed',
          {
            style: {
              background: '#D9206E',
              color: '#FAFAFA',
            },
          }
        );
      } else if (err instanceof Error) {
        toast(err.message, {
          style: {
            background: '#D9206E',
            color: '#FAFAFA',
          },
        });
      } else {
        toast('Dunno man, some error I guess', {
          style: {
            background: '#D9206E',
            color: '#FAFAFA',
          },
        });
      }
    }
  };

  return (
    <section className='flex flex-row min-h-[1024px] items-center justify-center'>
      <img
        src={LoginBurger}
        alt='nothing'
        className='hidden sm:flex w-[720px] h-full'
      />
      <div
        id='base'
        className='flex flex-col w-[345px] h-[560px] sm:w-[374px] sm:h-[658px] mx-auto gap-[16px] sm:gap-[20px] bg-white text-black'
      >
        <img
          src={Lazy}
          alt='Foody here!'
          className='w-[114.43px] h-[32px] sm:w-[149px] sm:h-[42px] -mb-[2px]'
        />
        <div className='flex flex-col w-full gap-[6px]'>
          <p className='font-extrabold text-[24px] leading-[36px] sm:text-[36px] sm:leading-[44px] text-black'>
            Welcome Back
          </p>
          <p className='font-medium text-sm sm:text-base sm:tracking-tight'>
            Good to see you again! Let's eat
          </p>
        </div>
        <Tabs defaultValue='Login' className='gap-[16px] sm:gap-[20px]'>
          <TabsList className='w-full'>
            <TabsTrigger value='Login'>Sign In</TabsTrigger>
            <TabsTrigger value='Register'>Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value='Login'>
            <Form {...logiForm}>
              <form
                onSubmit={logiForm.handleSubmit(onLogin)}
                className='flex flex-col gap-[16px] sm:gap-[20px]'
              >
                <FormField
                  control={logiForm.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type='string'
                          placeholder='Email'
                          className='text-[#717680] text-sm tracking-tight w-full h-[42px] bg-transparent'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={logiForm.control}
                  name='pass'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='Password'
                          className='text-[#717680] text-sm tracking-tight w-full h-[42px] bg-transparent'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={logiForm.control}
                  name='rememberMe'
                  render={({ field }) => (
                    <div className='flex flex-row gap-[8px]'>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className='w-[20px] h-[20px] rounded-sm border-[#D5D7DA]'
                      />
                      <p className='font-medium text-sm'>Remember Me</p>
                    </div>
                  )}
                />
                <Button className='bg-[#C12116] w-full h-[44px] sm:h-[48px] flex rounded-[200px] p-[8px] gap-[8px] font-bold text-sm sm:text-base tracking-tight text-white'>
                  Login
                </Button>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value='Register'>
            <Form {...regiForm}>
              <form
                onSubmit={regiForm.handleSubmit(onRegister)}
                className='flex flex-col gap-[16px] sm:gap-[20px]'
              >
                <FormField
                  control={regiForm.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type='string'
                          placeholder='Name'
                          className='text-[#717680] text-sm tracking-tight w-full h-[42px] bg-transparent'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={regiForm.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type='email'
                          placeholder='Email'
                          className='text-[#717680] text-sm tracking-tight w-full h-[42px] bg-transparent'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={regiForm.control}
                  name='phone'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type='string'
                          placeholder='Phone'
                          className='text-[#717680] text-sm tracking-tight w-full h-[42px] bg-transparent'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={regiForm.control}
                  name='pass'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='Password'
                          className='text-[#717680] text-sm tracking-tight w-full h-[42px] bg-transparent'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={regiForm.control}
                  name='conpass'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='Confirm Password'
                          className='text-[#717680] text-sm tracking-tight w-full h-[42px] bg-transparent'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className='bg-[#C12116] w-full h-[44px] sm:h-[48px] flex rounded-[200px] p-[8px] gap-[8px] font-bold text-sm sm:text-base tracking-tight text-white'>
                  Register
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default LogRegi;
