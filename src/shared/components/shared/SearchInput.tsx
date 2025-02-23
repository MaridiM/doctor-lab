import { Search, X } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

import { Button, Form, FormControl, FormField, FormItem, Input } from '../ui'

interface IProps {
    placeholder?: string
    isDirty?: boolean
    form: UseFormReturn<
        {
            searchTerm: string
        },
        any,
        undefined
    >
}

export function SearchInput({ form, isDirty, placeholder = 'Search' }: IProps) {
    return (
        <Form {...form}>
            <form className='flex h-14 w-full items-center gap-2 px-4 border-b-20'>
                <FormField
                    control={form.control}
                    name='searchTerm'
                    render={({ field }) => (
                        <FormItem className='flex w-full items-center'>
                            <FormControl>
                                <div className='flex w-full items-center gap-4'>
                                    <Search className='size-5 stroke-text-secondary' />
                                    <Input
                                        placeholder={placeholder}
                                        className='border-none bg-transparent px-0 text-text'
                                        {...field}
                                    />
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
                {isDirty && (
                    <Button variant='outline' size='icon' icon='sm' onClick={() => form.reset()}>
                        <X />
                    </Button>
                )}
            </form>
        </Form>
    )
}
