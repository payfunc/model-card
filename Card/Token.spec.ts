import * as model from "../index"

describe("Card Token", () => {
	it("is minimal", async () => {
		const card: model.Card.Token = {
			type: "single use",
			card: "12345678"
		}
		expect(model.Card.Token.hasInfo(card)).toBeFalsy()
		expect(model.Card.Token.is(card)).toBeTruthy()
	})
	it("has info", async () => {
		const card: model.Card.Token = {
			type: "single use",
			card: "12345678",
			scheme: "visa",
			iin: "411111",
			last4: "1111",
			expires: [12, 26],
		}
		expect(model.Card.Token.hasInfo(card)).toBeTruthy()
		expect(model.Card.Token.is(card)).toBeTruthy()
	})
	it("is minimal", async () => {
		const card: model.Card.Token = {
			type: "single use",
			card: "12345678"
		}
		expect(model.Card.Token.hasInfo(card)).toBeFalsy()
		expect(model.Card.Token.is(card)).toBeTruthy()
	})
	it("has info", async () => {
		const card: model.Card.Token = {
			type: "single use",
			card: "12345678",
			scheme: "visa",
			iin: "411111",
			last4: "1111",
			expires: [12, 26],
		}
		expect(model.Card.Token.hasInfo(card)).toBeTruthy()
		expect(model.Card.Token.is(card)).toBeTruthy()
	})
	it("Verifying tokens signed in backend", async () => {
		const originalMinimalToken: model.Card.Token = {
			type: "single use",
			card: "12345678",
		}
		const minimalToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjYXJkZnVuYyIsImlhdCI6MTU5NTYwNDg5OTI0NiwiYXVkIjoiZGV2ZWxvcG1lbnQiLCJ0eXBlIjoic2luZ2xlIHVzZSIsImNhcmQiOiIxMjM0NTY3OCJ9.CW70uwZlIHh44hDeRZOCmPhzdGnFMFxjuDJayF16iDtMhOxuA9Xwvr8r5rJ7FYVJhrljyp87ntDSfJYMd2KJp9vA--AO6By7dDuk6REejT70AZnLiy3u8fMzT9gmKZYBZQPIID1HaGqwxX4yjcwoczavTQSaX0kgONibWe-UZ4ExWYqapgh4t7DfYLQrrgVqbHKUnuaqGr-5ehHhjtyglEySUH7UeexwqlHKR5updiqTe2wz61FHi2nBiZW_JvZVDAZbRkbci9J00fCWl3vl6VbIW9bGymfYSr3KXVfdEVaM1K1PPNsD8G5e0fJgwDm15JjJhGvkXqiFTXRM1cScdg"
		const verifiedMinimalToken = await model.Card.Token.verify(minimalToken)
		const payloadedMinimalToken = verifiedMinimalToken && { ...originalMinimalToken, aud: verifiedMinimalToken.aud, iss: verifiedMinimalToken.iss, iat: verifiedMinimalToken.iat }
		expect(verifiedMinimalToken).toEqual(payloadedMinimalToken)
		const originalTokenWithInfo: model.Card.Token = {
			type: "single use",
			card: "12345678",
			scheme: "visa",
			iin: "411111",
			last4: "1111",
			expires: [12, 26],
		}
		const tokenWithInfo = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjYXJkZnVuYyIsImlhdCI6MTU5NTYwNDg5OTI2OSwiYXVkIjoiZGV2ZWxvcG1lbnQiLCJ0eXBlIjoic2luZ2xlIHVzZSIsImNhcmQiOiIxMjM0NTY3OCIsInNjaGVtZSI6InZpc2EiLCJpaW4iOiI0MTExMTEiLCJsYXN0NCI6IjExMTEiLCJleHBpcmVzIjpbMTIsMjZdfQ.JMA2FYtK8EVp2nV1BnLFoM1k2Cz8XTZEABBH7ZwGtfrp7sURb9QQPgXiO_luM4bRtqyVgtAUOxdp-KKS1IHGFmhga-9nh94Piv1qoR9XROSI9YJFn71N5m7x8qWZYh874KLEwrXWZge4WP1n1K_MtiEmzZw_yq1InOKaYqhfF3XMb1dTx0-k37_2RfKHLXPYuEdVy5ygRHONt2BcNsMkmV1Nh1YZ4ktPbAHynYWlqKEp1eLjJpMoSN7wLecZHLkzSenCHEDHLxVayqJBR48TxB3PV23CzqqEWlvg7EVY3io5lAiUJyXanAUCOF6lPlbNjR-BLQ2BmzcjJLEefxXqXA"
		const verifiedWithInfo = await model.Card.Token.verify(tokenWithInfo)
		const withInfoPayloaded = verifiedWithInfo && { ...originalTokenWithInfo, aud: verifiedWithInfo.aud, iss: verifiedWithInfo.iss, iat: verifiedWithInfo.iat }
		expect(verifiedWithInfo).toEqual(withInfoPayloaded)
	})
})
