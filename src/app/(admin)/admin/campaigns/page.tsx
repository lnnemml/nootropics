import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdminAuthed } from "@/lib/admin/auth";
import { listNoraBroadcasts, marketingListHealth, resendSegmentInfo } from "@/lib/admin/marketing";
import { noraSegmentId } from "@/lib/marketing/contacts";
import {
  AdminHeader,
  Card,
  EmptyRow,
  SectionHeading,
  TABLE_WRAP,
  TD,
  THEAD,
  TR,
  Th,
} from "../ui";
import { BroadcastControls, SyncContactsButton, type BroadcastOption } from "./BroadcastControls";

export const metadata: Metadata = {
  title: "Campaigns",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function fmtTs(ts: string | null): string {
  if (!ts) return "—";
  const d = new Date(ts);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("en-GB", {
    year: "2-digit",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
}

function shortId(id: string): string {
  return id.length > 10 ? `${id.slice(0, 8)}…` : id;
}

export default async function AdminCampaignsPage() {
  if (!(await isAdminAuthed())) redirect("/admin/login");

  const segmentId = noraSegmentId();
  const [health, segment, result] = await Promise.all([
    marketingListHealth(),
    resendSegmentInfo(),
    listNoraBroadcasts(),
  ]);

  const options: BroadcastOption[] = result.broadcasts.map((b) => ({
    id: b.id,
    label: `${b.name} · ${b.status} · ${shortId(b.id)}`,
  }));

  return (
    <main className="min-h-screen bg-page p-8">
      <div className="max-w-[1300px] mx-auto">
        <AdminHeader section="Campaigns" />

        {!segmentId && (
          <p className="font-mono text-xs text-amber-500">
            {"RESEND_SEGMENT_ID is not set: new orders aren't added to Resend, and nothing can be sent from here."}
          </p>
        )}

        <SectionHeading>{"Marketing list"}</SectionHeading>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Card label="Contacts" value={String(health.total)} sub="every order's email" />
          <Card label="Active" value={String(health.active)} sub="not opted out" />
          <Card label="Opted out" value={String(health.optedOut)} sub="never mailed" />
          <Card
            label="Resend segment"
            value={segment.error ? "—" : segment.approximate ? `${segment.count}+` : String(segment.count)}
            sub={segment.error ? segment.error : `id ${shortId(segmentId ?? "")}`}
            subTone={segment.error ? "danger" : "muted"}
          />
        </div>
        <div className="mt-4 border border-border rounded-[2px] bg-card p-5">
          <SyncContactsButton />
          <p className="mt-3 font-mono text-[11px] text-ink/50">
            {"New orders join the list automatically. Sync adds everyone who ordered before that; contacts already on the list (including opt-outs) are never touched, and *.test addresses are skipped."}
          </p>
        </div>

        <SectionHeading>{`NORA broadcasts (${result.broadcasts.length})`}</SectionHeading>
        {result.error && <p className="mb-3 font-mono text-xs text-red-500">{result.error}</p>}
        <div className={TABLE_WRAP}>
          <table className="w-full min-w-[760px] text-sm">
            <thead className={THEAD}>
              <tr>
                <Th>{"Name"}</Th>
                <Th>{"ID"}</Th>
                <Th>{"Status"}</Th>
                <Th>{"Created (UTC)"}</Th>
                <Th>{"Scheduled"}</Th>
                <Th>{"Sent"}</Th>
              </tr>
            </thead>
            <tbody>
              {result.broadcasts.map((b) => (
                <tr key={b.id} className={TR}>
                  <td className="px-4 py-3 text-sm text-ink">{b.name}</td>
                  <td className={TD}>{shortId(b.id)}</td>
                  <td className={TD}>{b.status}</td>
                  <td className={TD}>{fmtTs(b.createdAt)}</td>
                  <td className={TD}>{fmtTs(b.scheduledAt)}</td>
                  <td className={TD}>{fmtTs(b.sentAt)}</td>
                </tr>
              ))}
              {result.broadcasts.length === 0 && <EmptyRow colSpan={6}>{"No broadcasts on NORA's segment yet."}</EmptyRow>}
            </tbody>
          </table>
        </div>
        {result.hiddenOtherSegments > 0 && (
          <p className="mt-2 font-mono text-[11px] text-ink/50">
            {`${result.hiddenOtherSegments} broadcast(s) on other segments in this Resend account (e.g. isrib.shop) are hidden and can't be sent from here.`}
          </p>
        )}

        <SectionHeading>{"Send"}</SectionHeading>
        <div className="max-w-xl border border-border rounded-[2px] bg-card p-5">
          <BroadcastControls options={options} />
          <p className="mt-4 font-mono text-[11px] text-ink/50">
            {"Test sends the selected broadcast to your admin inbox. Send mails every contact in NORA's segment; Resend handles unsubscribe. Write the content in Resend, with NORA's segment as the audience."}
          </p>
        </div>
      </div>
    </main>
  );
}
