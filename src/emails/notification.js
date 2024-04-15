import React from 'react';
import {
    Html,
    Body,
    Head,
    Preview,
    Tailwind,
    Container,
    Section,
    Img,
    Hr,
    Text,
    Button,
    Row,
    Column,
    CodeBlock,
    dracula,
} from '@react-email/components';

const CRON_HOOK_BASE_URL = 'https://cronhook.hckr.mx';

export default function TestEmail({
    // ...
    subject,
    content,
    code,
    icon,
    action,
    user,
}) {
    const previewText = content;

    return (
        <Html>
            <Head>
                <title>CronHook Notification</title>
                <style>
                    {`
                        code p {
                        margin-block-start: 0px;
                        margin-block-end: 0px;
                        }
                    `}
                </style>
            </Head>

            <Preview>{previewText}</Preview>

            <Tailwind>
                <Body className='bg-white font-sans px-2 my-auto mx-auto font-sans p-2'>
                    <Container className='bg-slate-950 rounded-xl p-4 pt-0 mx-auto p-[20px]'>
                        <Section className='flex flex-row justify-center p-8'>
                            <Img src={`${CRON_HOOK_BASE_URL}/img/logo.png`} width='240' />
                        </Section>

                        <Section className='bg-white rounded-lg px-4'>
                            <Section className='my-4'>
                                <Text className='text-2xl font-bold my-0'>
                                    You got a notification
                                </Text>
                                <Text className='text-slate-700 my-0'>
                                    Don't miss out all your alerts and updates
                                </Text>
                            </Section>

                            <Hr />

                            <Section className='pt-2 pb-4'>
                                <Row>
                                    {icon !== '' && (
                                        <Column className='align-top pr-4'>
                                            <Img
                                                className='rounded-lg aspect-square object-contain'
                                                src={icon}
                                                width='64'
                                                height='64'
                                            />
                                        </Column>
                                    )}

                                    <Column className='align-top' width='100%'>
                                        <Text className='text-lg font-semibold my-0'>
                                            {subject}
                                        </Text>
                                        <Text className='text-sm my-0'>{content}</Text>

                                        {code !== '' && (
                                            <CodeBlock
                                                code={code}
                                                theme={dracula}
                                                language='text'
                                                lineNumbers
                                            />
                                        )}

                                        {action?.href && action?.label && (
                                            <Button
                                                className='mt-4 inline-block w-max font-semibold rounded-lg bg-gray-200 px-3 py-2 text-sm'
                                                href={action?.href}
                                            >
                                                {action?.label}
                                            </Button>
                                        )}
                                    </Column>
                                </Row>
                            </Section>

                            {user?.email && (
                                <>
                                    <Hr />

                                    <Section className='mb-4'>
                                        <Text className='my-0 text-slate-500'>
                                            This automated notification was sent to{' '}
                                            <b>{user?.email}</b> because you deployed a function.
                                        </Text>
                                    </Section>
                                </>
                            )}
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
