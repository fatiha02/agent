import React from 'react';
import Link from 'next/link';
import { Edit, Trash, Eye, MoreVertical, AlertCircle } from 'lucide-react';

const CourseCard = ({ course, onEdit, onDelete, onReview, isInstructor = false }) => {
    if (!course) return null;
    const { _id, title, thumbnail, price, isFree, status, category } = course;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative aspect-video bg-gray-100">
                {thumbnail ? (
                    <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Thumbnail
                    </div>
                )}
                {isInstructor && (
                    <div className={`absolute top-2 right-2 px-2 py-1 rounded text-[10px] font-bold uppercase ${status === 'PUBLISHED' ? 'bg-green-100 text-green-700' :
                        status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                        }`}>
                        {status}
                    </div>
                )}
            </div>

            <div className="p-4 space-y-2">
                <div className="flex justify-between items-start gap-2">
                    <span className="text-xs font-medium text-blue-600 px-2 py-0.5 bg-blue-50 rounded-full">
                        {category}
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                        {isFree ? 'Free' : `₹${price}`}
                    </span>
                </div>

                <h3 className="font-semibold text-gray-900 line-clamp-2 min-h-[3rem]">
                    {title}
                </h3>

                {isInstructor ? (
                    <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                            <Link
                                href={`/instructor/courses/${_id}/lessons`}
                                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2 text-sm"
                            >
                                <Eye className="w-4 h-4" />
                                Curriculum
                            </Link>
                            <Link
                                href={`/instructor/courses/${_id}/edit`}
                                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2 text-sm"
                            >
                                <Edit className="w-4 h-4" />
                                Edit
                            </Link>
                            <button
                                onClick={() => onDelete(_id)}
                                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2 text-sm"
                            >
                                <Trash className="w-4 h-4" />
                                Delete
                            </button>
                        </div>
                        {status === 'DRAFT' && onReview && (
                            <button
                                onClick={() => onReview(_id)}
                                className="w-full py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors"
                            >
                                Submit for Review
                            </button>
                        )}
                        {status === 'DRAFT' && course.rejectionReason && (
                            <div className="p-3 bg-red-50 rounded-xl border border-red-100 flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-red-600 uppercase tracking-wider">Rejection Reason</p>
                                    <p className="text-xs text-red-700 leading-relaxed italic">
                                        "{course.rejectionReason}"
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="pt-2">
                        <Link
                            href={`/courses/${_id}`}
                            className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                            View Details
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseCard;
