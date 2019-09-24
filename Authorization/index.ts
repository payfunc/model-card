import * as isoly from "isoly"
import * as authly from "authly"
import { Cancel } from "../Cancel"
import { Capture } from "../Capture"
import { Card } from "../Card"
import { Creatable as AuthorizationCreatable } from "./Creatable"
import { Refund } from "../Refund"

export interface Authorization {
	id: authly.Identifier
	number?: string
	reference: string
	descriptor?: string
	ip?: string
	created: isoly.DateTime
	amount?: number
	currency?: isoly.Currency
	card: Card
	capture: Capture[],
	refund: Refund[],
	cancel?: Cancel,
}

export namespace Authorization {
	export function is(value: Authorization | any): value is Authorization {
		return typeof(value) == "object" &&
			authly.Identifier.is(value.id) &&
			(value.number == undefined || typeof(value.number) == "string") &&
			typeof(value.reference) == "string" &&
			(value.descriptor == undefined || typeof(value.descriptor) == "string") &&
			(value.ip == undefined || typeof(value.ip) == "string") &&
			isoly.DateTime.is(value.created) &&
			(
				typeof(value.amount) == "number" && isoly.Currency.is(value.currency) ||
				value.amount == undefined && value.currency == undefined
			) &&
			Card.is(value.card) &&
			Array.isArray(value.capture) && value.capture.every(Capture.is)
	}
	export async function verify(token: authly.Token): Promise<Authorization | undefined> {
		const algorithm = authly.Algorithm.RS256("MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzWkKmoMsdU6TRKeMYFlwwRxb7uuA3Xh1zsya9m9QLcF7FhSLxsaDF7hHWmbBLsKBCDT35hl8mIxOssQGcq5CvhntAmI7RgWExs/VgtyJK1uRxgUKS7wCuWxlB3akXY4f2UXcFn+wOqBdhh1yep726MvB/Jh4nDusXb5G4evVJLIrMKc8vvLqmEo9x8wuXz5s6qvIlHf6h7KLICNsX0ZCv6Tf3OYbZlfd0us+gQTvqhk+dj6P2UaUlQmsEAOerLvSKWDa1KNe0i58/aoDgC9FZGCmpg1mtPegQ09IAVgCaqQ6zqA1wPIWiOO89pWWne28tRCNYGvNY0eXUSG6qXv5LQIDAQAB")
		const result = await authly.Verifier.create("card", algorithm)!.verify(token)
		return is(result) ? result : undefined
	}
	export type Creatable = AuthorizationCreatable
	export namespace Creatable {
		// tslint:disable-next-line: no-shadowed-variable
		export const is = AuthorizationCreatable.is
		export type Safe = AuthorizationCreatable.Safe
		export namespace Safe {
			// tslint:disable-next-line: no-shadowed-variable
			export const is = AuthorizationCreatable.Safe.is
		}
	}
}
