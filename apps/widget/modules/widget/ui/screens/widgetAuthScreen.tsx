import React from 'react'
import WidgetHeader from '../components/widgetHeader'
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from '@workspace/ui/components/form'
import { Button } from '@workspace/ui/components/button'
import { Input } from '@workspace/ui/components/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from 'convex/react'
import { api } from '@workspace/backend/_generated/api'
import { Doc } from '@workspace/backend/_generated/dataModel'

const formSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
})

const organizationId = "123";

const WidgetAuthScreen = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
        },
    });

    const createContactSession = useMutation(api.public.contactSessions.create);

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        if (!organizationId) {
            return;
        }

        const metadata: Doc<'contactSessions'>['metadata'] = {
            userAgent: navigator.userAgent,
            language: navigator.language,
            languages: navigator.languages?.join(','),
            platform: navigator.platform,
            vendor: navigator.vendor,
            screenResolution: `${window.screen.width}x${window.screen.height}`,
            viewportSize: `${window.innerWidth}x${window.innerHeight}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            timezoneOffset: new Date().getTimezoneOffset(),
            cookieEnabled: navigator.cookieEnabled,
            referrer: document.referrer || 'direct',
            currentUrl: window.location.href,
        };

        const contactSessionId = await createContactSession({
            ...data,
            organizationId,
            metadata,
        });

        console.log({contactSessionId});
    }
  return (
    <>
        <WidgetHeader>
            <div className='flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold'>
                <p className='text-3xl'>Hi There! 👋🏽</p>
                <p className='text-lg'>
                    Let&apos;s get you started.
                </p>
            </div>
        </WidgetHeader>
        <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className='flex flex-col gap-y-4 p-4 flex-1'
            >
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder='Enter your name' 
                                    {...field} 
                                    className='h-10 bg-background'
                                    type='text'  
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input 
                                    placeholder='Enter your email' 
                                    {...field} 
                                    className='h-10 bg-background'
                                    type='email'  
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button 
                    className='w-full'
                    disabled={form.formState.isSubmitting}
                    type='submit'
                    size='lg'
                >
                    {form.formState.isSubmitting ? 'Submitting...' : 'Continue'}
                </Button>
            </form>
        </Form>
    </>
  )
}

export default WidgetAuthScreen