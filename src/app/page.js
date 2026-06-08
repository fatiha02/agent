import Link from 'next/link';
import { Search, SlidersHorizontal } from 'lucide-react';
import CourseCard from '@/components/courses/CourseCard';
import CategoryCard from '@/components/home/CategoryCard';
import ContinueLearning from '@/components/home/ContinueLearning';
import { getPublicCourses } from '@/services/course.service';

export default async function Home() {
    // Fetch real courses from database
    const allCourses = await getPublicCourses();
    const trendingCourses = allCourses.slice(0, 3); // Get first 3 courses

    return (
        <div className="flex flex-col gap-10 pb-12">
            {/* Hero Section */}
            <section className="px-6 md:px-12 py-10 md:py-20 flex flex-col items-center text-center space-y-8 max-w-5xl mx-auto w-full">
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-7xl font-black text-gray-900 leading-tight">
                        Unlock Your <span className="text-blue-600 bg-clip-text">Potential</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 font-medium max-w-2xl mx-auto">
                        What will you learn today? Explore thousands of courses from industry experts.
                    </p>
                </div>

                <div className="w-full max-w-2xl relative group px-2">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                    <div className="relative flex items-center bg-white border border-gray-100 rounded-2xl p-2 shadow-xl shadow-blue-50">
                        <Search className="ml-4 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search for courses, skills, or instructors..."
                            className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 placeholder-gray-400 font-medium py-3 px-4"
                        />
                        <button className="hidden sm:flex items-center gap-2 px-4 py-2 text-gray-500 hover:bg-gray-50 rounded-xl transition-colors">
                            <SlidersHorizontal className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Trending Courses Section */}
            <section className="px-6 md:px-12 space-y-6 max-w-7xl mx-auto w-full">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black text-gray-900">Trending Courses</h2>
                    <Link href="/courses" className="text-sm font-bold text-blue-600 hover:underline underline-offset-4">
                        See all
                    </Link>
                </div>

                <div className="flex overflow-x-auto pb-6 -mx-6 px-6 gap-6 scrollbar-hide no-scrollbar">
                    {trendingCourses.map((course) => (
                        <CourseCard
                            key={course._id}
                            course={JSON.parse(JSON.stringify(course))}
                        />
                    ))}
                </div>
            </section>

            {/* Categories Section */}
            <section className="px-6 md:px-12 space-y-6 max-w-7xl mx-auto w-full">
                <h2 className="text-2xl font-black text-gray-900">Categories</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    <CategoryCard title="Coding" />
                    <CategoryCard title="Design" />
                    <CategoryCard title="Business" />
                    <CategoryCard title="Marketing" />
                </div>
            </section>

            {/* Continue Learning Section */}
            <section className="px-6 md:px-12 space-y-6 max-w-7xl mx-auto w-full">
                <h2 className="text-2xl font-black text-gray-900">Continue Learning</h2>
                <div className="max-w-md">
                    <ContinueLearning />
                </div>
            </section>
        </div>
    );
}

