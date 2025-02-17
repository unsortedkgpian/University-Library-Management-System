// import BookOverview from "@/components/BookOverview";
// import BookList from "@/components/BookList";
// import { sampleBooks } from "@/constants";
// import { db } from "@/database/drizzle";
// import { usersTable } from "@/database/schema";

// export default async function Home() {
// 	const result = await db.select().from(usersTable);
// 	console.log(JSON.stringify(result, null, 2));
// 	return (
// 		<>
// 			<BookOverview {...sampleBooks[0]} />
// 			<BookList
// 				title="Latest Book"
// 				books={sampleBooks}
// 				containerClassName="mt-28"
// 			/>
// 		</>
// 	);
// }

import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { db } from "@/database/drizzle";
import { books, usersTable as users } from "@/database/schema";
import { auth } from "@/auth";
import { desc } from "drizzle-orm";

const Home = async () => {
    const session = await auth();

    const latestBooks = (await db
        .select()
        .from(books)
        .limit(10)
        .orderBy(desc(books.createdAt))) as Book[];

    return (
        <>
            <BookOverview
                {...latestBooks[0]}
                userId={session?.user?.id as string}
            />

            <BookList
                title="Latest Books"
                books={latestBooks.slice(1)}
                containerClassName="mt-28"
            />
        </>
    );
};

export default Home;
