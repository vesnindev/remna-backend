import { z } from 'zod';

import { SubscriptionSettingsSchema } from '../../models';
import { REST_API } from '../../api';

export namespace UpdateSubscriptionSettingsCommand {
    export const url = REST_API.SUBSCRIPTION_SETTINGS.UPDATE_SETTINGS;
    export const TSQ_url = url;

    export const RequestSchema = z.object({
        uuid: z.string().uuid(),

        profileTitle: z.optional(z.string()),
        supportLink: z.optional(z.string()),
        profileUpdateInterval: z.optional(z.number().int()),
        isProfileWebpageUrlEnabled: z.optional(z.boolean()),
        serveJsonAtBaseSubscription: z.optional(z.boolean()),
        addUsernameToBaseSubscription: z.optional(z.boolean()),
        isShowCustomRemarks: z.optional(z.boolean()),

        happAnnounce: z.optional(
            z
                .string()
                .max(200, { message: 'Announce must be less than 200 characters' })
                .nullable(),
        ),
        happRouting: z.optional(z.string().nullable()),

        expiredUsersRemarks: z.optional(z.array(z.string())),
        limitedUsersRemarks: z.optional(z.array(z.string())),
        disabledUsersRemarks: z.optional(z.array(z.string())),

        customResponseHeaders: z.optional(z.record(z.string(), z.string())),
    });

    export type Request = z.infer<typeof RequestSchema>;

    export const ResponseSchema = z.object({
        response: SubscriptionSettingsSchema,
    });

    export type Response = z.infer<typeof ResponseSchema>;
}
