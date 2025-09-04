import React from 'react';
import { router, Link } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Participant {
    id: number;
    participant_number: string;
    name: string;
    district: string;
    competition_branch: string;
    category: string;
    type: string;
    average_score: number | null;
    rank: number;
}

interface Props {
    participants: Participant[];
    filters: {
        branch?: string;
        category?: string;
        type?: string;
        district?: string;
    };
    [key: string]: unknown;
}

export default function ResultsIndex({ participants, filters }: Props) {
    const branches = [
        'Tafsir Al-Qur`an',
        'Karya Tulis Ilmiah Al-Qur`an', 
        'Musabaqah Hafalan Hadits',
        'Tilawah Al-Qur`an',
        'Hifzhil Al-Qur`an',
        'Khattil Al-Qur`an',
        'Syarhil Al-Qur`an',
        'Fahmil Al-Qur`an',
        'Barzanji'
    ];

    const handleFilter = (key: string, value: string) => {
        const params = new URLSearchParams(window.location.search);
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.get('/hasil', Object.fromEntries(params.entries()), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-yellow-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b-4 border-green-500">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-xl">🏆</span>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-green-800">Hasil MTQ</h1>
                                <p className="text-sm text-gray-600">Peringkat & Penilaian Peserta</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Button variant="outline" asChild>
                                <Link href="/">🏠 Beranda</Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="/daftar">📝 Daftar</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/* Stats */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-green-800 mb-4">
                        📊 Hasil Perlombaan MTQ
                    </h2>
                    <div className="flex justify-center space-x-6">
                        <Badge variant="secondary" className="bg-green-100 text-green-800 px-4 py-2">
                            ✅ {participants.length} Peserta Dinilai
                        </Badge>
                    </div>
                </div>

                {/* Filters */}
                <Card className="mb-8">
                    <CardContent className="p-6">
                        <h3 className="text-xl font-semibold text-green-800 mb-4">🔍 Filter Hasil</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <Select
                                value={filters.branch || ''}
                                onValueChange={(value) => handleFilter('branch', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Cabang Lomba" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">Semua Cabang</SelectItem>
                                    {branches.map((branch) => (
                                        <SelectItem key={branch} value={branch}>
                                            {branch}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select
                                value={filters.type || ''}
                                onValueChange={(value) => handleFilter('type', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Jenis" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">Putra & Putri</SelectItem>
                                    <SelectItem value="Putra">Putra</SelectItem>
                                    <SelectItem value="Putri">Putri</SelectItem>
                                </SelectContent>
                            </Select>

                            <Input 
                                placeholder="Filter berdasarkan kecamatan..."
                                value={filters.district || ''}
                                onChange={(e) => handleFilter('district', e.target.value)}
                            />

                            <Button 
                                variant="outline" 
                                onClick={() => router.get('/hasil')}
                                className="w-full"
                            >
                                🔄 Reset Filter
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Results */}
                {participants.length > 0 ? (
                    <div className="space-y-4">
                        {participants.map((participant) => (
                            <Card key={participant.id} className={`
                                ${participant.rank === 1 ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-400 border-2' : ''}
                                ${participant.rank === 2 ? 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-400 border-2' : ''}
                                ${participant.rank === 3 ? 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-400 border-2' : ''}
                                hover:shadow-lg transition-all duration-200
                            `}>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-6">
                                            <div className={`
                                                w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl
                                                ${participant.rank === 1 ? 'bg-yellow-400 text-yellow-900' : ''}
                                                ${participant.rank === 2 ? 'bg-gray-400 text-gray-900' : ''}
                                                ${participant.rank === 3 ? 'bg-orange-400 text-orange-900' : ''}
                                                ${participant.rank > 3 ? 'bg-green-100 text-green-800' : ''}
                                            `}>
                                                #{participant.rank}
                                                {participant.rank === 1 && <span className="ml-1">🥇</span>}
                                                {participant.rank === 2 && <span className="ml-1">🥈</span>}
                                                {participant.rank === 3 && <span className="ml-1">🥉</span>}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-1">
                                                    {participant.name}
                                                </h3>
                                                <p className="text-gray-600 mb-2">
                                                    No. {participant.participant_number} • {participant.district}
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    <Badge variant="outline" className="text-xs">
                                                        📖 {participant.competition_branch}
                                                    </Badge>
                                                    <Badge variant="secondary" className="text-xs">
                                                        🎯 {participant.category}
                                                    </Badge>
                                                    <Badge variant="outline" className="text-xs">
                                                        👤 {participant.type}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-3xl font-bold text-green-600 mb-1">
                                                {participant.average_score?.toFixed(2)}
                                            </div>
                                            <p className="text-sm text-gray-500 mb-3">Rata-rata Nilai</p>
                                            <Button 
                                                size="sm"
                                                className="bg-green-600 hover:bg-green-700"
                                                asChild
                                            >
                                                <Link href={`/hasil/${participant.id}`}>
                                                    📋 Lihat Detail
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="text-center py-16">
                            <div className="text-6xl mb-4">📊</div>
                            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                                Belum Ada Hasil
                            </h3>
                            <p className="text-gray-500 mb-6 max-w-md mx-auto">
                                Hasil perlombaan akan ditampilkan setelah proses penilaian selesai 
                                atau coba ubah filter pencarian.
                            </p>
                            <div className="flex gap-4 justify-center">
                                <Button asChild>
                                    <Link href="/daftar">📝 Daftar Sekarang</Link>
                                </Button>
                                <Button variant="outline" onClick={() => router.get('/hasil')}>
                                    🔄 Reset Filter
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}