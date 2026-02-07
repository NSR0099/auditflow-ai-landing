import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Upload,
  TrendingUp,
  TrendingDown,
  FileText,
  ShieldAlert,
  IndianRupee,
  Search,
  ArrowUpDown,
  Filter,
  ShoppingCart,
  Package,
  Eye,
  Download,
  BarChart3,
  Clock,
  Brain,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";

// Mock invoice data
const mockInvoices = [
  { id: "INV-001", vendor: "Reliance Industries", type: "Purchase", amount: 245000, date: "2026-02-01", status: "Verified", riskScore: 12, anomalyType: "None" },
  { id: "INV-002", vendor: "Tata Motors", type: "Sales", amount: 520000, date: "2026-02-02", status: "Pending", riskScore: 45, anomalyType: "Unusual Volume" },
  { id: "INV-003", vendor: "Infosys Ltd", type: "Purchase", amount: 180000, date: "2026-01-30", status: "Flagged", riskScore: 87, anomalyType: "Duplicate Invoice" },
  { id: "INV-004", vendor: "Wipro Technologies", type: "Sales", amount: 340000, date: "2026-01-28", status: "Verified", riskScore: 8, anomalyType: "None" },
  { id: "INV-005", vendor: "Mahindra & Mahindra", type: "Purchase", amount: 420000, date: "2026-01-25", status: "Under Review", riskScore: 62, anomalyType: "Weekend Transaction" },
  { id: "INV-006", vendor: "HCL Technologies", type: "Sales", amount: 890000, date: "2026-01-22", status: "Verified", riskScore: 5, anomalyType: "None" },
  { id: "INV-007", vendor: "Bajaj Finance", type: "Purchase", amount: 156000, date: "2026-01-20", status: "Flagged", riskScore: 91, anomalyType: "High Value Outlier" },
  { id: "INV-008", vendor: "Adani Enterprises", type: "Sales", amount: 675000, date: "2026-01-18", status: "Pending", riskScore: 38, anomalyType: "New Vendor" },
  { id: "INV-009", vendor: "Sun Pharma", type: "Purchase", amount: 298000, date: "2026-01-15", status: "Verified", riskScore: 15, anomalyType: "None" },
  { id: "INV-010", vendor: "Larsen & Toubro", type: "Sales", amount: 1120000, date: "2026-01-12", status: "Under Review", riskScore: 55, anomalyType: "Benford's Law" },
];

type SortField = "id" | "vendor" | "amount" | "date" | "riskScore";
type SortDir = "asc" | "desc";

const Dashboard = () => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"All" | "Sales" | "Purchase">("All");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const filteredInvoices = useMemo(() => {
    let data = [...mockInvoices];

    if (typeFilter !== "All") {
      data = data.filter((inv) => inv.type === typeFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (inv) =>
          inv.id.toLowerCase().includes(q) ||
          inv.vendor.toLowerCase().includes(q) ||
          inv.status.toLowerCase().includes(q)
      );
    }

    data.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDir === "asc" ? aVal - bVal : bVal - aVal;
      }
      return sortDir === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

    return data;
  }, [search, typeFilter, sortField, sortDir]);

  const totalSales = mockInvoices
    .filter((i) => i.type === "Sales")
    .reduce((sum, i) => sum + i.amount, 0);
  const totalPurchases = mockInvoices
    .filter((i) => i.type === "Purchase")
    .reduce((sum, i) => sum + i.amount, 0);
  const flaggedCount = mockInvoices.filter((i) => i.riskScore >= 70).length;
  const pendingCount = mockInvoices.filter(
    (i) => i.status === "Pending" || i.status === "Under Review"
  ).length;

  const handleUpload = (type: "Sales" | "Purchase") => {
    toast({
      title: `${type} Invoice Upload`,
      description: `Upload feature will be available when backend is connected.`,
    });
  };

  const getRiskBadge = (score: number) => {
    let colorClass = "bg-success/10 text-success border-success/20";
    if (score >= 70) colorClass = "bg-destructive/10 text-destructive border-destructive/20";
    else if (score >= 40) colorClass = "bg-warning/10 text-warning border-warning/20";

    return (
      <div className="flex items-center gap-2">
        <div className="h-2 w-16 overflow-hidden rounded-full bg-secondary">
          <div
            className={`h-full ${score >= 70 ? 'bg-destructive' : score >= 40 ? 'bg-warning' : 'bg-success'}`}
            style={{ width: `${score}%` }}
          />
        </div>
        <span className={`text-xs font-semibold ${score >= 70 ? 'text-destructive' : score >= 40 ? 'text-warning' : 'text-success'}`}>
          {score}/100
        </span>
      </div>
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Verified":
        return <Badge variant="outline" className="border-success/30 text-success">Verified</Badge>;
      case "Flagged":
        return <Badge variant="outline" className="border-destructive/30 text-destructive">Flagged</Badge>;
      case "Under Review":
        return <Badge variant="outline" className="border-warning/30 text-warning">Under Review</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            Welcome back, {user?.ownerName || "User"}
          </h1>
          <p className="mt-1 text-muted-foreground">
            {user?.businessName} — Here's your audit overview
          </p>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="rounded-[4px] border-slate-200 bg-white shadow-md transition-shadow hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold text-slate-500">Total Sales</CardTitle>
              <TrendingUp className="h-5 w-5 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1 text-2xl font-bold text-[#0B1120]">
                <IndianRupee className="h-5 w-5" />
                {(totalSales / 100000).toFixed(1)}L
              </div>
              <p className="mt-1 text-xs font-medium text-emerald-600">+12.5% from last month</p>
            </CardContent>
          </Card>

          <Card className="rounded-[4px] border-slate-200 bg-white shadow-md transition-shadow hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold text-slate-500">Total Purchases</CardTitle>
              <TrendingDown className="h-5 w-5 text-[#06B6D4]" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1 text-2xl font-bold text-[#0B1120]">
                <IndianRupee className="h-5 w-5" />
                {(totalPurchases / 100000).toFixed(1)}L
              </div>
              <p className="mt-1 text-xs font-medium text-slate-500">-3.2% from last month</p>
            </CardContent>
          </Card>

          <Card className="rounded-[4px] border-slate-200 bg-white shadow-md transition-shadow hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold text-slate-500">Flagged Invoices</CardTitle>
              <ShieldAlert className="h-5 w-5 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0B1120]">{flaggedCount}</div>
              <p className="mt-1 text-xs font-medium text-red-600">Requires attention</p>
            </CardContent>
          </Card>

          <Card className="rounded-[4px] border-slate-200 bg-white shadow-md transition-shadow hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold text-slate-500">Pending Review</CardTitle>
              <Clock className="h-5 w-5 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0B1120]">{pendingCount}</div>
              <p className="mt-1 text-xs font-medium text-amber-500">Awaiting verification</p>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Insights
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="border-t-4 border-t-[#06B6D4] border-x border-b border-slate-200 bg-white shadow-sm rounded-[4px]">
              <CardContent className="pt-6">
                <p className="text-sm font-medium text-[#0B1120]">
                  Vendor X shows <span className="text-[#06B6D4] font-bold">32% increase</span> in invoice value this quarter.
                </p>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-t-red-500 border-x border-b border-slate-200 bg-white shadow-sm rounded-[4px]">
              <CardContent className="pt-6">
                <p className="text-sm font-medium text-[#0B1120]">
                  Duplicate invoice pattern detected across <span className="text-red-500 font-bold">3 vendors</span>.
                </p>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-t-amber-500 border-x border-b border-slate-200 bg-white shadow-sm rounded-[4px]">
              <CardContent className="pt-6">
                <p className="text-sm font-medium text-[#0B1120]">
                  High anomaly spike this month (<span className="text-amber-500 font-bold">+15%</span> vs avg).
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Upload Section */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <Card
            className="cursor-pointer border-dashed border-2 border-primary/30 bg-primary/5 transition-all hover:border-primary/60 hover:bg-primary/10"
            onClick={() => handleUpload("Sales")}
          >
            <CardContent className="flex flex-col items-center justify-center py-10">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <ShoppingCart className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Upload Sales Invoice</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                PDF, Excel, CSV, or Image
              </p>
              <Button className="mt-4 gap-2" size="sm">
                <Upload className="h-4 w-4" />
                Upload
              </Button>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer border-dashed border-2 border-accent-foreground/20 bg-accent/30 transition-all hover:border-accent-foreground/40 hover:bg-accent/50"
            onClick={() => handleUpload("Purchase")}
          >
            <CardContent className="flex flex-col items-center justify-center py-10">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent">
                <Package className="h-7 w-7 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Upload Purchase Invoice</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                PDF, Excel, CSV, or Image
              </p>
              <Button className="mt-4 gap-2" size="sm">
                <Upload className="h-4 w-4" />
                Upload
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Invoice Table */}
        <Card className="border-border/60">
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="h-5 w-5 text-primary" />
                  Invoice Status
                </CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  {filteredInvoices.length} invoices found
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search invoices..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-9 w-56 pl-9"
                  />
                </div>
                <div className="flex items-center gap-1 rounded-md border border-border bg-muted/50 p-0.5">
                  <Filter className="ml-2 h-4 w-4 text-muted-foreground" />
                  {(["All", "Sales", "Purchase"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setTypeFilter(f)}
                      className={`rounded px-3 py-1.5 text-xs font-medium transition-colors ${typeFilter === f
                        ? "bg-card text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead>
                      <button className="flex items-center gap-1 font-medium" onClick={() => toggleSort("id")}>
                        Invoice ID <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </TableHead>
                    <TableHead>
                      <button className="flex items-center gap-1 font-medium" onClick={() => toggleSort("vendor")}>
                        Vendor <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>
                      <button className="flex items-center gap-1 font-medium" onClick={() => toggleSort("amount")}>
                        Amount <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </TableHead>
                    <TableHead>
                      <button className="flex items-center gap-1 font-medium" onClick={() => toggleSort("date")}>
                        Date <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>
                      <span className="font-medium">Anomaly Type</span>
                    </TableHead>
                    <TableHead>
                      <button className="flex items-center gap-1 font-medium" onClick={() => toggleSort("riskScore")}>
                        Risk Score <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((inv) => (
                    <TableRow
                      key={inv.id}
                      className={
                        inv.riskScore >= 70
                          ? "bg-destructive/5 hover:bg-destructive/10"
                          : ""
                      }
                    >
                      <TableCell className="font-mono text-sm font-medium">{inv.id}</TableCell>
                      <TableCell>{inv.vendor}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-xs">
                          {inv.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        ₹{inv.amount.toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{inv.date}</TableCell>
                      <TableCell>{getStatusBadge(inv.status)}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{inv.anomalyType}</TableCell>
                      <TableCell>{getRiskBadge(inv.riskScore)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              toast({ title: "View Invoice", description: `Viewing ${inv.id}` })
                            }
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              toast({ title: "Download", description: `Downloading ${inv.id}` })
                            }
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              toast({ title: "Audit Report", description: `Generating report for ${inv.id}` })
                            }
                          >
                            <BarChart3 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
