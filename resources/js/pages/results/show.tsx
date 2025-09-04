import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Score {
    id: number;
    score_1: number | null;
    score_2: number | null;
    score_3: number | null;
    score_4: number | null;
    score_5: number | null;
    total_score: number | null;
    notes: string | null;
    judge: {
        name: string;
    };
}

interface Participant {
    id: number;
    participant_number: string;
    name: string;
    nik: string;
    birth_date: string;
    gender: string;
    district: string;
    competition_branch: string;
    category: string;
    type: string;
    status: string;
    notes: string | null;
    average_score: number | null;
    scores: Score[];
}

interface Props {
    participant: Participant;
    [key: string]: unknown;
}

export default function ShowResult({ participant }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Lulus':
                return <Badge className="bg-green-100 text-green-800">✅ Lulus</Badge>;
            case 'Tidak Lulus':
                return <Badge className="bg-red-100 text-red-800">❌ Tidak Lulus</Badge>;
            default:
                return <Badge className="bg-yellow-100 text-yellow-800">⏳ Belum Verifikasi</Badge>;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-yellow-50 py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-green-800 mb-2">
                        📋 Detail Hasil Peserta
                    </h1>
                    <Button variant="outline" asChild className="mb-4">
                        <Link href="/">↩️ Kembali ke Daftar Hasil</Link>
                    </Button>
                </div>

                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Participant Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span>🧑‍🎓 Informasi Peserta</span>
                                {getStatusBadge(participant.status)}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h3 className="font-semibold text-lg text-green-800 mb-4">
                                    {participant.name}
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Nomor Peserta:</span>
                                        <span className="font-medium">{participant.participant_number || 'Belum ada'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">NIK:</span>
                                        <span className="font-medium">{participant.nik}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tanggal Lahir:</span>
                                        <span className="font-medium">{formatDate(participant.birth_date)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Jenis Kelamin:</span>
                                        <span className="font-medium">{participant.gender}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Kecamatan:</span>
                                        <span className="font-medium">{participant.district}</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold text-green-800 mb-2">Kategori Lomba</h4>
                                <div className="space-y-2">
                                    <Badge variant="outline" className="w-full justify-start">
                                        📖 {participant.competition_branch}
                                    </Badge>
                                    <Badge variant="secondary" className="w-full justify-start">
                                        🎯 {participant.category}
                                    </Badge>
                                    <Badge variant="outline" className="w-full justify-start">
                                        👤 {participant.type}
                                    </Badge>
                                </div>
                                {participant.notes && (
                                    <div className="mt-4">
                                        <h4 className="font-semibold text-green-800 mb-2">Catatan</h4>
                                        <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                                            {participant.notes}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Average Score */}
                    {participant.average_score && (
                        <Card>
                            <CardHeader>
                                <CardTitle>🏆 Nilai Rata-rata</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-green-600 mb-2">
                                        {participant.average_score.toFixed(2)}
                                    </div>
                                    <p className="text-gray-600">Dari {participant.scores.length} juri</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Detailed Scores */}
                    {participant.scores.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>⚖️ Detail Penilaian Juri</CardTitle>
                                <CardDescription>
                                    Berikut adalah detail penilaian dari setiap juri
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {participant.scores.map((score) => (
                                        <div key={score.id} className="border rounded-lg p-4 bg-gray-50">
                                            <div className="flex items-center justify-between mb-3">
                                                <h4 className="font-semibold text-green-800">
                                                    👨‍⚖️ Juri: {score.judge.name}
                                                </h4>
                                                {score.total_score && (
                                                    <Badge className="bg-blue-100 text-blue-800">
                                                        Total: {score.total_score}
                                                    </Badge>
                                                )}
                                            </div>
                                            
                                            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-3">
                                                {[
                                                    { label: 'Kriteria 1', value: score.score_1 },
                                                    { label: 'Kriteria 2', value: score.score_2 },
                                                    { label: 'Kriteria 3', value: score.score_3 },
                                                    { label: 'Kriteria 4', value: score.score_4 },
                                                    { label: 'Kriteria 5', value: score.score_5 }
                                                ].map((item, idx) => (
                                                    <div key={idx} className="text-center p-2 bg-white rounded">
                                                        <div className="text-xs text-gray-600">{item.label}</div>
                                                        <div className="font-semibold text-green-600">
                                                            {item.value || '-'}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            
                                            {score.notes && (
                                                <div className="mt-2">
                                                    <h5 className="text-sm font-medium text-gray-700 mb-1">Catatan Juri:</h5>
                                                    <p className="text-sm text-gray-600 bg-white p-2 rounded border">
                                                        {score.notes}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {participant.scores.length === 0 && participant.status === 'Lulus' && (
                        <Card>
                            <CardContent className="text-center py-12">
                                <div className="text-4xl mb-4">⏳</div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                    Belum Ada Penilaian
                                </h3>
                                <p className="text-gray-500">
                                    Peserta ini sudah lulus verifikasi namun belum dinilai oleh juri.
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}