import React from 'react';
import { router, usePage, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

export default function Welcome({ participants, filters }: Props) {
    const { auth } = usePage<{ auth: { user: { name: string } | null } }>().props;

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
        router.get('/', Object.fromEntries(params.entries()), {
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
                                <span className="text-white font-bold text-xl">📖</span>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-green-800">MTQ Kabupaten</h1>
                                <p className="text-sm text-gray-600">Musabaqah Tilawatil Quran</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            {!auth.user ? (
                                <>
                                    <Button variant="outline" asChild>
                                        <Link href="/daftar">📝 Daftar Lomba</Link>
                                    </Button>
                                    <Button asChild className="bg-green-600 hover:bg-green-700">
                                        <Link href="/login">🔐 Login</Link>
                                    </Button>
                                </>
                            ) : (
                                <Button asChild className="bg-green-600 hover:bg-green-700">
                                    <Link href="/dashboard">📊 Dashboard</Link>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="py-12 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-green-800 mb-4">
                        🏆 Hasil Perlombaan MTQ
                    </h2>
                    <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                        Lihat peringkat dan hasil penilaian peserta Musabaqah Tilawatil Quran tingkat kabupaten. 
                        Semua hasil telah diverifikasi dan dinilai oleh tim juri profesional.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                            ✅ {participants.length} Peserta Dinilai
                        </Badge>
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                            🎯 9 Cabang Lomba
                        </Badge>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            👥 Multiple Kategori
                        </Badge>
                    </div>
                </div>
            </section>

            {/* Filters */}
            <section className="py-8 bg-white/70">
                <div className="container mx-auto px-4">
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
                            onClick={() => router.get('/')}
                            className="w-full"
                        >
                            🔄 Reset Filter
                        </Button>
                    </div>
                </div>
            </section>

            {/* Results */}
            <section className="py-8">
                <div className="container mx-auto px-4">
                    {participants.length > 0 ? (
                        <div className="grid gap-4">
                            {participants.slice(0, 50).map((participant) => (
                                <Card key={participant.id} className={`
                                    ${participant.rank === 1 ? 'bg-yellow-50 border-yellow-400 border-2' : ''}
                                    ${participant.rank === 2 ? 'bg-gray-50 border-gray-400 border-2' : ''}
                                    ${participant.rank === 3 ? 'bg-orange-50 border-orange-400 border-2' : ''}
                                    hover:shadow-lg transition-shadow
                                `}>
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className={`
                                                    w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                                                    ${participant.rank === 1 ? 'bg-yellow-400 text-yellow-900' : ''}
                                                    ${participant.rank === 2 ? 'bg-gray-400 text-gray-900' : ''}
                                                    ${participant.rank === 3 ? 'bg-orange-400 text-orange-900' : ''}
                                                    ${participant.rank > 3 ? 'bg-green-100 text-green-800' : ''}
                                                `}>
                                                    #{participant.rank}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-lg text-gray-900">
                                                        {participant.name}
                                                    </h4>
                                                    <p className="text-sm text-gray-600">
                                                        No. {participant.participant_number} • {participant.district}
                                                    </p>
                                                    <div className="flex gap-2 mt-1">
                                                        <Badge variant="outline" className="text-xs">
                                                            {participant.competition_branch}
                                                        </Badge>
                                                        <Badge variant="secondary" className="text-xs">
                                                            {participant.category}
                                                        </Badge>
                                                        <Badge variant="outline" className="text-xs">
                                                            {participant.type}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-green-600">
                                                    {participant.average_score?.toFixed(2)}
                                                </div>
                                                <p className="text-xs text-gray-500">Rata-rata Nilai</p>
                                                <Button 
                                                    size="sm" 
                                                    variant="outline"
                                                    className="mt-2"
                                                    asChild
                                                >
                                                    <Link href={`/hasil/${participant.id}`}>
                                                        Detail 📋
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📊</div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                Belum Ada Hasil
                            </h3>
                            <p className="text-gray-500 mb-6">
                                Hasil perlombaan akan ditampilkan setelah proses penilaian selesai.
                            </p>
                            <Button asChild>
                                <Link href="/daftar">📝 Daftar Sekarang</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </section>

            {/* Features */}
            <section className="py-12 bg-white/70">
                <div className="container mx-auto px-4">
                    <h3 className="text-2xl font-bold text-center text-green-800 mb-8">
                        ✨ Fitur Aplikasi MTQ
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card>
                            <CardHeader>
                                <div className="text-3xl mb-2">📝</div>
                                <CardTitle>Pendaftaran Online</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    Daftar peserta secara online dengan mudah dan cepat. 
                                    Upload foto dan lengkapi data diri.
                                </p>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardHeader>
                                <div className="text-3xl mb-2">⚖️</div>
                                <CardTitle>Penilaian Transparan</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    Sistem penilaian yang transparan dengan multiple juri 
                                    untuk setiap cabang lomba.
                                </p>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardHeader>
                                <div className="text-3xl mb-2">🏆</div>
                                <CardTitle>Hasil Real-time</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    Lihat hasil dan peringkat secara real-time setelah 
                                    proses penilaian selesai.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-green-800 text-white py-8">
                <div className="container mx-auto px-4 text-center">
                    <h4 className="text-lg font-semibold mb-2">📖 MTQ Kabupaten</h4>
                    <p className="text-green-200 mb-4">
                        Musabaqah Tilawatil Quran - Membina Generasi Qurani
                    </p>
                    <div className="flex justify-center space-x-6 text-sm">
                        <Link href="/daftar" className="hover:text-yellow-300">
                            📝 Pendaftaran
                        </Link>
                        <Link href="/hasil" className="hover:text-yellow-300">
                            🏆 Hasil Lomba
                        </Link>
                        <Link href="/login" className="hover:text-yellow-300">
                            🔐 Login
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}