import BookOverview from "@/components/BookOverview";
import BookList from "@/components/BookList";
import { sampleBooks } from "@/constants";
import { db } from "@/database/drizzle";
import { usersTable } from "@/database/schema";

export default async function Home() {
	const result = await db.select().from(usersTable);
	console.log(JSON.stringify(result, null, 2));
	return (
		<>
			<BookOverview {...sampleBooks[0]} />
			<BookList
				title="Latest Book"
				books={sampleBooks}
				containerClassName="mt-28"
			/>
		</>
	);
}
